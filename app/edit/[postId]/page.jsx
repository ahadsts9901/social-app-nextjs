"use client"

import "../../globals.css"
import "./index.css"
import React, { useEffect, useRef, useState } from 'react'
import MiniDrawer from '../../Mui/components/MiniDrawer'
import { ThemeProvider } from '@emotion/react'
import { v2Theme } from '../../Mui/client.mjs'
import Image from "next/image"
import { Button } from '@mui/material'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AlertMUI from "../../Mui/components/AlertMUI"
import axios from "axios"
import { useParams, useRouter } from 'next/navigation'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const EditPost = () => {

    const { postId } = useParams();
    const router = useRouter()

    const [post, setPost] = useState(null)
    const [text, setText] = useState(null)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [clientErrorMessage, setClientErrorMessage] = React.useState(null)
    const [clientSuccessMessage, setClientSuccessMessage] = React.useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const textRef = useRef()

    useEffect(() => {
        getSinglePost(postId)
    }, [postId])

    useEffect(() => {
        setText(post?.text)
    }, [post])

    useEffect(() => {

        if (text === post?.text) {
            setIsButtonDisabled(true)
        } else if (!text) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }

    }, [text])

    const getSinglePost = async (postId) => {

        if (!postId) {
            setClientErrorMessage("Post id is required")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000);
            return;
        }

        try {

            const response = await axios.get(`/api/v1/post?postId=${postId}`, { withCredentials: true })
            setPost(response.data.data)

        } catch (error) {
            console.log(error);
            setClientErrorMessage(error.response.data.message)
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000);
        }

    }

    const submitHandler = async (e) => {

        e.preventDefault()

        if (!text) {
            setClientErrorMessage("Text is required")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return;
        }

        if (text && text?.trim().length < 1) {
            setClientErrorMessage("Text too short")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return;
        }

        if (text && text?.trim().length > 1000) {
            setClientErrorMessage("Text must be less than 1000 characters")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return;
        }

        try {

            setIsLoading(true)
            setIsButtonDisabled(true)

            const response = await axios.put(`/api/v1/post?postId=${postId}`, { text: text }, {
                withCredentials: true,
            })

            setIsLoading(false)
            setIsButtonDisabled(false)

            setClientSuccessMessage(response.data.message)
            setText(null)
            textRef.current.value = ""
            router.push("/")

            setTimeout(() => {
                setClientSuccessMessage(null)
            }, 2000)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setIsButtonDisabled(false)
            setClientErrorMessage(error?.response?.data?.message)
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
            <div className='w-[100%] h-[100%] flex editCont gap-8 p-8'>
                <div className="h-[100%] flex-1 flex flex-col gap-8">
                    <ArrowBackRoundedIcon style={{ fontSize: "1.2em" }} />
                    <textarea placeholder={post?.media ? "Edit your caption..." : "Edit your post..."} className='resize-none outline-none bg-inherit h-[100%] hide-scrollbar'
                        onChange={(event) => {
                            setText(event.target.value)
                        }}
                        value={text}
                        ref={textRef}
                    ></textarea>
                    <Button onClick={submitHandler} disabled={isButtonDisabled} color="primary" variant="contained" className={`${isLoading ? "w-40" : "w-32"} flex justify-center items-center gap-8`} button="desktop">
                        {
                            isLoading ? <>
                                <span className="buttonLoader"></span>
                                Processing
                            </> : "Edit"
                        }
                    </Button>
                </div>
                <Button onClick={submitHandler} disabled={isButtonDisabled} variant="contained" color="primary" className={isLoading ? "w-36" : "w-32"} button="small">
                    {
                        isLoading ? <>
                            <span className="buttonLoader"></span>
                            Processing
                        </> : "Edit"
                    }
                </Button>
                <div className="editPostMediaCont">
                    {post?.media && (
                        post?.mediaType === "image" ? <img src={post?.media} className="w-[100%] object-contain h-[100%] object-left-top" />
                            :
                            <video src={post?.media} muted loop controls className="w-[100%] h-[100%] bg-black" />
                    )}
                </div>
            </div>
        </ThemeProvider >
    )
}

export default EditPost