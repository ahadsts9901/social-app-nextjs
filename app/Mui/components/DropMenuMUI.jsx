import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from "react-redux"
import DialogueMUI from './DialogueMUI';
import axios from 'axios';
import { CircularProgress } from "@mui/material"
import { useRouter } from 'next/navigation';

export default function DropMenuMUI(props) {

    const router = useRouter()
    const currentUser = useSelector(state => state.user)

    const [open, setOpen] = React.useState(false);
    const [showDialogueBox, setShowDialogueBox] = React.useState(false);
    const [dialogueTitle, setDialogueTitle] = React.useState(null);
    const [dialogueDescription, setDialogueDescription] = React.useState(null);
    const [disagreeButton, setDisagreeButton] = React.useState(null);
    const [agreeButton, setAgreeButton] = React.useState(null);
    const [fun, setFun] = React.useState(null)

    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const delPost = async (postId) => {

        try {

            setDialogueTitle(<span className='w-[100%] flex justify-center items-center mt-4'><CircularProgress /></span>)
            setDialogueDescription(<span className='w-[100%] text-center'>Deleting Post...</span>)
            setDisagreeButton("Cancel")
            setAgreeButton(null)

            const response = await axios.delete(`/api/v1/post?postId=${postId}`)

            setDialogueTitle(<span className='w-[100%] text-center'>Success</span>)
            setDialogueDescription(<span className='w-[100%] text-center'>{response.data.message}</span>)
            setDisagreeButton("Ok")

            setTimeout(() => {
                setShowDialogueBox(false)
                props.setPosts(props.posts.filter(post => post._id !== postId))
            }, 3000);

        } catch (error) {
            console.log(error);
            setDialogueTitle(<span className='w-[100%] text-center'>Oops!</span>)
            setDialogueDescription(<span className='w-[100%] text-center'>{error.response.data.message}</span>)
            setDisagreeButton("Ok")
            setAgreeButton(null)
            setTimeout(() => {
                setShowDialogueBox(false)
            }, 3000);
        }

    }

    const disablePost = async (postId) => {

        try {

            setDialogueTitle(<span className='w-[100%] flex justify-center items-center mt-4'><CircularProgress /></span>)
            setDialogueDescription(<span className='w-[100%] text-center'>Processing...</span>)
            setDisagreeButton("Cancel")
            setAgreeButton(null)

            const response = await axios.put(`/api/v1/post/disable?postId=${postId}`)

            setDialogueTitle(<span className='w-[100%] text-center'>Success</span>)
            setDialogueDescription(<span className='w-[100%] text-center'>{response.data.message}</span>)
            setDisagreeButton("Ok")

            setTimeout(() => {
                setShowDialogueBox(false)
                props.setPosts(props.posts.filter(post => post._id !== postId))
            }, 3000);

        } catch (error) {
            console.log(error);
            setDialogueTitle(<span className='w-[100%] text-center'>Oops!</span>)
            setDialogueDescription(<span className='w-[100%] text-center'>{error.response.data.message}</span>)
            setDisagreeButton("Ok")
            setAgreeButton(null)
            setTimeout(() => {
                setShowDialogueBox(false)
            }, 3000);
        }

    }

    const activatePost = async (postId) => {

        try {

            setDialogueTitle(<span className='w-[100%] flex justify-center items-center mt-4'><CircularProgress /></span>)
            setDialogueDescription(<span className='w-[100%] text-center'>Processing...</span>)
            setDisagreeButton("Cancel")
            setAgreeButton(null)

            const response = await axios.put(`/api/v1/post/activate?postId=${postId}`)

            setDialogueTitle(<span className='w-[100%] text-center'>Success</span>)
            setDialogueDescription(<span className='w-[100%] text-center'>{response.data.message}</span>)
            setDisagreeButton("Ok")

            setTimeout(() => {
                setShowDialogueBox(false)
            }, 3000);

        } catch (error) {
            console.log(error);
            setDialogueTitle(<span className='w-[100%] text-center'>Oops!</span>)
            setDialogueDescription(<span className='w-[100%] text-center'>{error.response.data.message}</span>)
            setDisagreeButton("Ok")
            setAgreeButton(null)
            setTimeout(() => {
                setShowDialogueBox(false)
            }, 3000);
        }

    }

    return (
        <>
            {
                showDialogueBox && <DialogueMUI title={dialogueTitle} description={dialogueDescription}
                    agree={agreeButton} disAgree={disagreeButton} fun={fun} postId={props.postId}
                    open={true}
                />
            }
            <Stack direction="row" spacing={2}>
                <MoreVertIcon style={{
                    width: "20px",
                    height: "20px",
                }}
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                />
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {
                                            currentUser._id === props.authorId ?

                                                <div>
                                                    <MenuItem onClick={() => {
                                                        handleClose
                                                        router.push(`edit/${props.postId}`)
                                                    }}>Edit</MenuItem>
                                                    <MenuItem onClick={() => {
                                                        handleClose
                                                        setShowDialogueBox(true)
                                                        setDialogueTitle("Delete Post")
                                                        setDialogueDescription("Are you sure you want to delete this post?")
                                                        setDisagreeButton("Cancel")
                                                        setAgreeButton("Delete")
                                                        setFun(() => delPost)
                                                    }}>Delete</MenuItem>
                                                </div>
                                                :
                                                (
                                                    props.isDisabled ?
                                                        <MenuItem onClick={() => {
                                                            handleClose
                                                            setShowDialogueBox(true)
                                                            setDialogueTitle("Activate Post")
                                                            setDialogueDescription("Are you sure you want to activate this post?")
                                                            setDisagreeButton("Cancel")
                                                            setAgreeButton("Activate")
                                                            setFun(() => activatePost)
                                                        }}>Activate</MenuItem>
                                                        : <MenuItem onClick={() => {
                                                            handleClose
                                                            setShowDialogueBox(true)
                                                            setDialogueTitle("Disable Post")
                                                            setDialogueDescription("Are you sure you want to disable this post?")
                                                            setDisagreeButton("Cancel")
                                                            setAgreeButton("Disable")
                                                            setFun(() => disablePost)
                                                        }}>Disable</MenuItem>
                                                )
                                        }
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Stack>
        </>
    );
}