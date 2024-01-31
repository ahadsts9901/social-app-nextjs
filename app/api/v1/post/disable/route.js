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
            message: "You are not authorized to disable this posts"
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

        if (post.isDisabled) {
            return NextResponse.json({
                message: "Post is already disabled"
            }, { status: 400 })
        }

        post.isDisabled = true
        await post.save()

        const user = await userModel.findById(post.authorId).select("email firstName").exec()

        await sendEmail(
            user.email,
            user.firstName,
            `Hi ${user.firstName}! your post has disabled`,
            `Hi ${user.firstName}! We have disabled your post because it doesn't follow our policy, 
            if you will change it so we can activate it again, after changing your post mail us at 
            <a href="mailto:ahadsts990@gmail.com?subject=Hi%20Admin!%20enable%20my%20post%20please&body=Post%20link%20${baseUrl}/post/${post._id}">ahadsts990@gmail.com</a>
            <br/><b>Post url:</b><br/><a href="${baseUrl}/post/${post._id}">${baseUrl}/post/${post._id}</a>
            `
        );

        return NextResponse.json({
            message: "Post disabled successfully"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};