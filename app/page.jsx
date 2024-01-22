"use client"

import React from 'react'
import { v2Theme } from './Mui/client.mjs';
import { ThemeProvider } from '@emotion/react';
import LabelBottomNavigation from './Mui/components/LabelBottomNavigation';

const page = () => {
  return (
    <>
      <>
        <ThemeProvider theme={v2Theme}>
          <LabelBottomNavigation />
        </ThemeProvider>
      </>
    </>
  )
}

export default page