"use client"

import "../../globals.css"
import react, { useEffect, useState } from 'react'
import MiniDrawer from '../../Mui/components/MiniDrawer'
import { ThemeProvider } from '@emotion/react'
import { v2Theme } from '../../Mui/client.mjs'
import { useParams, useRouter } from 'next/navigation'
import AlertMUI from '@/app/Mui/components/AlertMUI'
import axios from "axios"
import { coverPhoto, profilePicture } from '@/app/api/schema.mjs'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useSelector } from "react-redux"
import moment from "moment"
import PostMUI from "@/app/Mui/components/PostMUI"
import { CircularProgress } from "@mui/material"

const Profile = () => {

    const { userId } = useParams()

    const currentUser = useSelector(state => state.user)

    const router = useRouter()

    const [clientErrorMessage, setClientErrorMessage] = useState(null)
    const [clientSuccessMessage, setClientSuccessMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState(null)

    const currentTime = moment();
    const givenTime = moment(profile?.createdOn);
    const hoursDifference = currentTime.diff(givenTime, 'hours');
    const isWithin48Hours = hoursDifference <= 48;

    useEffect(() => {
        getProfile(userId)
    }, [userId])

    const getProfile = async (userId) => {

        if (!userId) {
            setClientErrorMessage("User Id is required")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        try {

            setIsLoading(true)
            const response = await axios.get(`/api/v1/profile?id=${userId}`)
            setIsLoading(false)
            setProfile(response.data.data.userData)
            setPosts(response.data.data.userPosts)

        } catch (error) {
            console.log(error);
            setClientErrorMessage(error.response.data.message)
            setIsLoading(false)
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000);
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
                <div className='w-[100%] h-[100%] flex flex-col gap-8 relative'>
                    {isLoading ? <CircularProgress className="m-[auto]" /> :
                        <>
                            {
                                profile?._id === currentUser?._id && <>
                                    <AddAPhotoRoundedIcon className="dropShadow absolute top-[3.2em] right-4 text-2xl text-white cursor-pointer" />
                                    <SettingsRoundedIcon className="dropShadow absolute top-[6em] right-8 text-2xl cursor-pointer" onClick={()=>router.push("/settings")} />
                                </>
                            }
                            <img src={profile?.coverPhoto || coverPhoto} alt='cover photo' className='h-[7em] w-[100%] object-cover' />
                            <div className='absolute left-4 top-12 flex flex-col gap-4'>
                                <img src={profile?.profilePhoto || profilePicture} alt="profile picture" className='h-[7em] w-[7em] object-cover rounded-full' />
                                {
                                    profile?._id === currentUser?._id && <EditRoundedIcon className='dropShadow cursor-pointer absolute top-[3.5em] left-[3.5em]' style={{
                                        width: "0.8em"
                                    }} />
                                }
                            </div>
                            <div className="p-4 flex flex-col gap-0">
                                <h2 className="font-bold text-2xl p-2 flex items-center">
                                    <span>{profile ? `${profile?.firstName} ${profile?.lastName}` : ""}</span>
                                    {
                                        profile?._id === currentUser?._id && <EditRoundedIcon className='cursor-pointer ml-2 ' style={{
                                            width: "0.8em"
                                        }} />
                                    }
                                </h2>
                                <p className="w-[100%] text-left pl-2 cursor-pointer">{profile ? (profile?.bio ? profile?.bio : "No bio...") : null}</p>
                                {/* <p className="pl-2"><span className="font-bold">Joined</span> {isWithin48Hours ? moment(profile?.createdOn).fromNow() : moment(profile?.createdOn).format("LL")}</p>
                        <p className="font-bold p-2 flex items-center">
                            <span>{profile ? `${profile?.email}` : ""}</span>
                            {
                                profile?._id === currentUser?._id && <EditRoundedIcon className='cursor-pointer ml-2 ' style={{
                                    width: "0.6em"
                                }} />
                            }
                        </p> */}
                            </div>
                            <div className="w-[100%] h-[100%]">
                                {
                                    posts?.length > 0 ? posts?.map((post) => (
                                        <PostMUI key={post._id} time={post.createdOn} authorImage={post.authorImage}
                                            text={post.text} authorName={post.authorName} media={post.media}
                                            likes={post.likes} authorId={post.authorId} mediaType={post.mediaType}
                                            postId={post._id} setPosts={setPosts} posts={posts} isDisabled={post.isDisabled}
                                        />
                                    )) : <p className="text-center text-2xl font-bold m-[auto]">No posts yet</p>
                                }
                            </div>
                        </>
                    }
                </div>
            </MiniDrawer>
        </ThemeProvider>
    )
}

export default Profile 