"use client"

import React from 'react'
import MiniDrawer from '../Mui/components/MiniDrawer'
import { ThemeProvider } from '@emotion/react'
import { v2Theme } from '../Mui/client.mjs'

const Profile = () => {
    return (
        <ThemeProvider theme={v2Theme}>
            <MiniDrawer>
            </MiniDrawer>
        </ThemeProvider>
    )
}

export default Profile