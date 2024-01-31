import "../../../mongodb.mjs";
import { NextResponse } from 'next/server';
import { getUserData, sendEmail } from "../../../functions.mjs";
import { postModel, userModel } from "../../../schema.mjs";
import { isValidObjectId } from "mongoose"
import { baseUrl } from "@/app/api/core.mjs";

export const PUT = async (req, res) => {

    const postId = new URL(req.url).searchParams.get("postId")

    const currentUser = await getUserData(req)

    if (!currentUser.isAdmin) {
        return NextResponse.json({
            message: "You are not authorized to activate this posts"
        }, { status: 401 })
    }

    if (!isValidObjectId(postId)) {
        return NextResponse.json({
            message: "Invalid post id"
        }, { status: 400 })
    }

    try {

        const post = await postModel.findById(postId)

        if (!post) {
            return NextResponse.json({
                message: "Post not found"
            }, { status: 404 })
        }

        if (!post.isDisabled) {
            return NextResponse.json({
                message: "Post is already activated"
            }, { status: 400 })
        }

        post.isDisabled = false
        await post.save()

        const user = await userModel.findById(post.authorId).select("email firstName").exec()

        await sendEmail(
            user.email,
            user.firstName,
            `Hi ${user.firstName}! your post has activated`,
            `Hi ${user.firstName}! We were disable your post in past. Now the post is activated don't hurt our policy again<br/>
            <b>Post url: </b><br/><a href="${baseUrl}/post/${post._id}">${baseUrl}/post/${post._id}</a>
            `
        );

        return NextResponse.json({
            message: "Post activated successfully"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};