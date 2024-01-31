"use client"

import "./globals.css"
import { v2Theme } from './Mui/client.mjs';
import { ThemeProvider } from '@emotion/react';
import MiniDrawer from './Mui/components/MiniDrawer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PostMUI from './Mui/components/PostMUI';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux'
import { login, logout } from "./redux/user";

const Page = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/v1/profile');
        dispatch(login(response.data.data))
      } catch (error) {
        console.error(error);
        dispatch(logout(null))
      }
    };

    fetchUser()

  }, [])

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/api/v1/feed?page=${posts.length}`, { withCredentials: true });
      setPosts((prevPosts) => [...prevPosts, ...res.data.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  return (
    <>
      <ThemeProvider theme={v2Theme}>
        <MiniDrawer>
          <div className="p-8 homeMainCont w-[100%] h-[100%]">
            {
              isLoading && <div className="w-[100%] h-[100%] flex justify-center items-center"><CircularProgress color="primary" /></div>
            }
            {
              posts.map((post) => (
                <PostMUI key={post._id} time={post.createdOn} authorImage={post.authorImage}
                  text={post.text} authorName={post.authorName} media={post.media}
                  likes={post.likes} authorId={post.authorId} mediaType={post.mediaType}
                  postId={post._id} setPosts={setPosts} posts={posts} isDisabled={post.isDisabled}
                />
              ))
            }
          </div>
        </MiniDrawer>
      </ThemeProvider>
    </>
  );
};

export default Page;