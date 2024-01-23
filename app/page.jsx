"use client"

import { v2Theme } from './Mui/client.mjs';
import { ThemeProvider } from '@emotion/react';
import MiniDrawer from './Mui/components/MiniDrawer';

const page = () => {

  return (

    <>
      <ThemeProvider theme={v2Theme}>
        <MiniDrawer />
      </ThemeProvider>
    </>

  )
}

export default page