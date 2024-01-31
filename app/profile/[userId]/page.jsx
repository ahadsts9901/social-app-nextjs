"use client"

import React, { useEffect } from 'react'
import MiniDrawer from '../../Mui/components/MiniDrawer'
import { ThemeProvider } from '@emotion/react'
import { v2Theme } from '../../Mui/client.mjs'
import { useParams } from 'next/navigation'

const Profile = () => {

    const { userId } = useParams()

    useEffect(() => {
        getProfile(userId)
    }, [userId])

    const getProfile = async (userId) => {
        console.log(userId);
    }

    return (
        <ThemeProvider theme={v2Theme}>
            <MiniDrawer>
            </MiniDrawer>
        </ThemeProvider>
    )
}

export default Profile