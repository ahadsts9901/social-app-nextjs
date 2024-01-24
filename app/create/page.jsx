"use client"

import "./index.css"
import React, { useEffect, useRef, useState } from 'react'
import MiniDrawer from '../Mui/components/MiniDrawer'
import { ThemeProvider } from '@emotion/react'
import { v2Theme } from '../Mui/client.mjs'
import Image from "next/image"
import { Button } from '@mui/material'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const Create = () => {

    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [text, setText] = useState(null)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {

        if (text || selectedVideo || selectedImage) {
            setIsButtonDisabled(false)
        }

        if (!text && !selectedVideo && !selectedImage) {
            setIsButtonDisabled(true)
        }

    }, [text, selectedVideo, selectedImage])

    return (
        <ThemeProvider theme={v2Theme}>
            <MiniDrawer>
                <div className='w-[100%] h-[90%] flex createCont gap-8'>
                    <div className="h-[100%] flex-1 flex flex-col gap-8">
                        <textarea placeholder={(selectedImage || selectedVideo) ? "Add a caption" : "Share a thought....!!"} className='resize-none outline-none bg-inherit h-[100%] hide-scrollbar'
                            onChange={(e) => {
                                setText(e.target.value)
                            }}
                        ></textarea>
                        <Button disabled={isButtonDisabled} color="primary" variant="contained" className="w-32" button="desktop">Post</Button>
                    </div>
                    {
                        (selectedImage || selectedVideo) &&
                        <div className='contentCont flex flex-col justify-between items-start flex-1 gap-2 h-[100%] rounded-3xl border-2 border-dashed p-4' >
                            <div className="h-[80%] imgVidCont relative">
                            <CancelRoundedIcon className='text-[#353535] z-40 bg-white rounded-full absolute top-0 left-0 cursor-pointer m-2 opacity-[0.8]'
                            onClick={() => {
                                setSelectedImage(null)
                                setSelectedVideo(null)
                            }}
                            />
                            {
                                selectedImage && <img src={selectedImage} className='createPhoto h-[100%] object-cover object-center self-start rounded-[12px]' />
                            }
                            {
                                selectedVideo && <video src={selectedVideo} autoplay muted controls loop className='createVideo h-[100%] bg-black rounded-[12px]' />
                            }
                            </div>
                            <label htmlFor="file" className='labelFile cursor-pointer'>
                                <FileUploadRoundedIcon className='text-[#dadada]' style={{
                                    width: '50px',
                                    height: '50px',
                                }} />
                            </label>
                        </div>
                    }
                    {
                        (!selectedImage && !selectedVideo) &&
                        <>
                            <label htmlFor='file'
                                className='cursor-pointer flex-1 rounded-3xl border-2 border-dashed flex flex-col justify-center items-center gap-8'>
                                <FileUploadRoundedIcon className='text-[#eee]' style={{
                                    width: '50%',
                                    height: '50%',
                                }} />
                            </label>
                        </>
                    }
                    <Button disabled={isButtonDisabled} variant="contained" color="primary" className="w-32" button="small">Post</Button>
                    <input type="file" id="file" accept="image/*,video/*" hidden onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                            if (file.type.startsWith('image/')) {
                                setSelectedVideo(null)
                                setSelectedImage(URL.createObjectURL(file))
                            } else if (file.type.startsWith('video/')) {
                                setSelectedImage(null)
                                setSelectedVideo(URL.createObjectURL(file))
                            }
                        }
                    }} />
                </div>
            </MiniDrawer>
        </ThemeProvider >
    )
}

export default Create