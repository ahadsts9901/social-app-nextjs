import "./index.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Box } from "@mui/material"
import DropMenuMUI from "./DropMenuMUI";

export default function PostMUI(props) {

    const currentUser = useSelector(state => state.user)

    const [showFullPost, setShowFullPost] = React.useState(false);

    const fullText = props.text;
    const splittedText = props.text.split(" ").slice(0, 40).join(" ");

    const toggleShowFullPost = () => {
        setShowFullPost(!showFullPost);
    };

    const currentTime = moment();
    const givenTime = moment(props.time);
    const hoursDifference = currentTime.diff(givenTime, 'hours');
    const isWithin48Hours = hoursDifference <= 48;

    return (
        <>
            <Card className="post" sx={{
                maxWidth: 450,
                margin: "0 auto",
                borderRadius: 0,
                boxShadow: "0 19px 38px rgba(0,0,0,.3), 0 15px 12px rgba(0,0,0,.22)",
            }} >
                <CardHeader
                    style={{
                        padding: "24px 8px 16px 8px",
                        alignItems: "start",
                        cursor: "pointer"
                    }}
                    avatar={
                        <img src={props.authorImage} alt="profile picture" className='w-[40px] h-[40px] object-cover rounded-full self-start' />
                    }

                    action={
                        (props.authorId === currentUser?._id || currentUser?.isAdmin) &&
                        <IconButton aria-label="settings" style={{ padding: "6px" }}>
                            <DropMenuMUI
                                postId={props.postId}
                                authorId={props.authorId}
                                setPosts={props.setPosts}
                                posts={props.posts}
                                isDisabled={props.isDisabled}
                            />
                        </IconButton>
                    }

                    title={props.authorName}
                    subheader={
                        isWithin48Hours ? moment(props.time).fromNow() : moment(props.time).format("LL")
                    }
                />
                {
                    props.text && <CardContent style={{
                        padding: fullText.length <= 40 && !props.media && "0",
                    }} >
                        <Typography
                            variant="body2" color="text.secondary"
                            className={`${fullText.length <= 40
                                ? props.media
                                    ? "smallText"
                                    : `bigText color-${Math.floor(Math.random() * 6)}`
                                : "smallText"
                                }`}
                        >
                            <span
                                onClick={() => {
                                    // seePost(props.postId);
                                }}
                            >
                                {showFullPost ? fullText : splittedText}
                            </span>
                            {splittedText !== fullText && (
                                <span className="cursor-pointer text-[#444]" onClick={toggleShowFullPost}>
                                    {showFullPost ? ".....see less" : ".....see more"}
                                </span>
                            )}
                        </Typography>
                    </CardContent>
                }
                {
                    props.media && (
                        props.mediaType === "image" ? <CardMedia
                            component="img"
                            height="194"
                            image={props.media}
                            alt="post media"
                        /> : <CardMedia
                            component="video"
                            height="194"
                            controls
                            autoPlay
                            loop
                            muted
                        >
                            <source src={props.media} type="video/mp4" />
                            Your browser does not support the video.
                        </CardMedia>
                    )
                }
                <CardActions disableSpacing className='w-[100%] flex justify-around items-center'
                    style={{
                        paddingBottom: "16px",
                    }}
                >
                    <IconButton aria-label="like" sx={{
                        padding: "4px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <ThumbUpRoundedIcon sx={{
                            width: 14,
                        }} />
                        <p className="text-[12px]">Like</p>
                    </IconButton>
                    <IconButton aria-label="comment" sx={{
                        padding: "4px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <CommentRoundedIcon sx={{
                            width: 14,
                        }} />
                        <p className="text-[12px]">Comment</p>
                    </IconButton>
                    <IconButton aria-label="share" sx={{
                        padding: "4px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <ShareIcon sx={{
                            width: 14,
                        }} />
                        <p className="text-[12px]">Share</p>
                    </IconButton>
                </CardActions>
                <Box style={{
                    padding: "6px",
                    backgroundColor: "#ececec",
                }}></Box>
            </Card>
        </>
    );
}