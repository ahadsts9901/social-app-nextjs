import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login, logout } from "./user"

const UserWrapper = ({ children }) => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/v1/ping');
                dispatch(login(response.data.data))
            } catch (error) {
                console.error(error);
                dispatch(logout(null))
            }
        };

        fetchUser()

    }, [])


    return (
        <>{children}</>
    )
}

export default UserWrapper