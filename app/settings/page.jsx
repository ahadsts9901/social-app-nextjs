"use client"

import "./index.css"
import react, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from 'next/navigation';
import TextFieldMUI from '../Mui/components/TextFieldMUI';
import { ThemeProvider } from '@emotion/react';
import { v2Theme } from '../Mui/client.mjs';
import { Button, Divider } from '@mui/material';

const Settings = () => {

    const currentUser = useSelector(state => state.user)
    const router = useRouter()

    useEffect(() => {
        setFirstName(currentUser?.firstName)
        setLastName(currentUser?.lastName)
        setBio(currentUser?.bio)
        setEmail(currentUser?.email)
    }, [currentUser])

    const [firstName, setFirstName] = useState(currentUser?.firstName)
    const [lastName, setLastName] = useState(currentUser?.lastName)
    const [bio, setBio] = useState(currentUser?.bio)
    const [email, setEmail] = useState(currentUser?.email)

    return (
        <ThemeProvider theme={v2Theme}>
            <div className='w-[100%] h-[100%] flex flex-col gap-4 p-4'>
                <ArrowBackRoundedIcon onClick={() => router.back()} className='cursor-pointer' />
                <div className="settingSectionCont">
                    <>
                        <div className='setting-section flex flex-col gap-4'>
                            <h3 className='text-xl font-bold text-[#353535]'>Settings</h3>
                            <Divider />
                            <div className="pt-2"></div>
                            <div className='flex flex-col gap-8'>
                                <TextFieldMUI label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <TextFieldMUI label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <TextFieldMUI label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} multiline rows={6} />
                                <Button color='primary' variant='contained'>Update Profile</Button>
                            </div>
                            <div className='p-2'></div>
                        </div>
                    </>
                    <>
                        <div className='setting-section flex flex-col gap-4'>
                            <h3 className='text-xl font-bold text-[#353535]'>Email</h3>
                            <Divider />
                            <div className="pt-2"></div>
                            <div className='flex flex-col gap-8'>
                                <TextFieldMUI label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Button color='primary' variant='contained' sx={{marginTop: 1}}>Verify Email</Button>
                            </div>
                            <div className="pt-2"></div>
                        </div>
                    </>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Settings