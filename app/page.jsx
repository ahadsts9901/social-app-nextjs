"use client"

import React from 'react'
import { theme } from './Mui/client.mjs';
import { ThemeProvider } from '@emotion/react';


const page = () => {
  return (
    <>
      <>
        <ThemeProvider theme={theme}>
        </ThemeProvider>
      </>
    </>
  )
}

export default page