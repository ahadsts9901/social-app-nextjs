"use client"

import "../globals.css"
import "./index.css"
import React, { useEffect, useRef, useState } from 'react'
import MiniDrawer from '../Mui/components/MiniDrawer'
import { ThemeProvider } from '@emotion/react'
import { v2Theme } from '../Mui/client.mjs'
import Image from "next/image"
import { Button } from '@mui/material'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AlertMUI from "../Mui/components/AlertMUI"
import axios from "axios"

const Create = () => {

    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [text, setText] = useState(null)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [clientErrorMessage, setClientErrorMessage] = React.useState(null)
    const [clientSuccessMessage, setClientSuccessMessage] = React.useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fileRef = useRef()

    useEffect(() => {

        if (text || selectedVideo || selectedImage) {
            setIsButtonDisabled(false)
        }

        if (!text && !selectedVideo && !selectedImage) {
            setIsButtonDisabled(true)
        }

    }, [text, selectedVideo, selectedImage])

    const submitHandler = async (e) => {
        e.preventDefault()

        const file = fileRef.current.files[0]

        if (!text && !file) {
            setClientErrorMessage("Please enter text or select a file")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return;
        }

        if (text?.trim().length > 1000) {
            setClientErrorMessage("Text must be less than 1000 characters")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return;
        }

        const formData = new FormData()
        formData.append("text", text)
        formData.append("file", file)

        try {

            setIsLoading(true)
            setIsButtonDisabled(true)

            const response = await axios.post("/api/v1/post", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            })

            setIsLoading(false)
            setIsButtonDisabled(false)

            setClientSuccessMessage(response.data.message)
            setTimeout(() => {
                setClientSuccessMessage(null)
            }, 2000)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setIsButtonDisabled(false)
            setClientErrorMessage(error.response.data.message)
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
        }

    }

    return (
        <ThemeProvider theme={v2Theme}>
            {
                clientErrorMessage && <AlertMUI status="error" text={clientErrorMessage} />
            }
            {
                clientSuccessMessage && <AlertMUI status="success" text={clientSuccessMessage} />
            }
            <MiniDrawer>
                <div className='w-[100%] h-[90%] flex createCont gap-8'>
                    <div className="h-[100%] flex-1 flex flex-col gap-8">
                        <textarea placeholder={(selectedImage || selectedVideo) ? "Add a caption" : "Share a thought....!!"} className='resize-none outline-none bg-inherit h-[100%] hide-scrollbar'
                            onChange={(e) => {
                                setText(e.target.value)
                            }}
                        ></textarea>
                        <Button onClick={submitHandler} disabled={isButtonDisabled} color="primary" variant="contained" className={`${isLoading ? "w-40" : "w-32"} flex justify-center items-center gap-8`} button="desktop">
                            {
                                isLoading ? <>
                                    <span className="buttonLoader"></span>
                                    Processing
                                </> : "Post"
                            }
                        </Button>
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
                                    selectedImage && <img priority="true" crossOrigin="anonymous" src={selectedImage} className='createPhoto h-[100%] object-cover object-center self-start rounded-[12px]' />
                                }
                                {
                                    selectedVideo && <video src={selectedVideo} autoPlay muted controls loop className='createVideo h-[100%] bg-black rounded-[12px]' />
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
                    <Button onClick={submitHandler} disabled={isButtonDisabled} variant="contained" color="primary" className={isLoading ? "w-36" : "w-32"} button="small">
                        {
                            isLoading ? <>
                                <span className="buttonLoader"></span>
                                Processing
                            </> : "Post"
                        }
                    </Button>
                    <input ref={fileRef} type="file" id="file" accept="image/*,video/*" hidden onChange={(e) => {
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