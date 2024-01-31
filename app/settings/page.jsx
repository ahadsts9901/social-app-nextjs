"use client"

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Settings = () => {

    const currentUser = useSelector(state => state.user)

    return (
        <div className='w-[100%] h-[100%] flex flex-col gap-4'></div>
    )
}

export default Settings