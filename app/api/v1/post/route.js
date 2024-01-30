import "../../mongodb.mjs";
import { NextResponse } from 'next/server';
import { deleteOnCloudinary, uploadOnCloudinary } from "../../cloudinary.mjs";
import { getUserData } from "../../functions.mjs";
import { postModel } from "../../schema.mjs";
import { isValidObjectId } from "mongoose"

export const POST = async (req, res) => {

    const formData = await req.formData();
    const text = formData.get('text');
    const file = formData.get('file');

    if (!text && !file) {
        return NextResponse.json({
            message: "Required parameters missing"
        }, { status: 400 })
    }

    if (text && text.trim().length > 1000) {
        return NextResponse.json({
            message: "Text must be less than 1000 characters"
        }, { status: 400 })
    }

    if (text && text?.trim().length < 1) {
        return NextResponse.json({
            message: "Text too short"
        }, { status: 400 })
    }

    if (file && file.size > 20000000 && file.type.startsWith("image")) {
        return NextResponse.json({
            message: "Image too large, maximum limit is 2MB"
        }, { status: 400 })
    }

    if (file && file.size > 100000000 && file.type.startsWith("video")) {
        return NextResponse.json({
            message: "Image too large, maximum limit is 10MB"
        }, { status: 400 })
    }

    try {

        if (file) {
            try {
                var uploadedFile = await uploadOnCloudinary(file, "we-app-nextjs/posts")
            } catch (error) {
                var uploadedFile = null
            }
        }

        const userData = await getUserData(req)

        if (text === "null") {

            const response = await postModel.create({
                authorImage: userData.profilePhoto,
                authorName: `${userData.firstName} ${userData.lastName}`,
                authorId: userData._id,
                text: "",
                media: uploadedFile?.url || null,
                mediaType: uploadedFile?.resource_type || null,
            })

        } else {

            const response = await postModel.create({
                authorImage: userData.profilePhoto,
                authorName: `${userData.firstName} ${userData.lastName}`,
                authorId: userData._id,
                text: text,
                media: uploadedFile?.url || null,
                mediaType: uploadedFile?.resource_type || null,
            })
        }

        return NextResponse.json({
            message: "Post successful"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};

export const DELETE = async (req) => {

    const postId = new URL(req.url).searchParams.get("postId")

    if (!postId) {
        return NextResponse.json({
            message: "Post id is required"
        }, { status: 400 })
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

        await deleteOnCloudinary(post.media)

        const postDeleteResponse = await postModel.findByIdAndDelete(postId)

        return NextResponse.json({
            message: "Post deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};

export const GET = async (req) => {

    const postId = new URL(req.url).searchParams.get("postId")

    if (!postId) {
        return NextResponse.json({
            message: "Post id is required"
        }, { status: 400 })
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

        return NextResponse.json({
            message: "Post fetched successfully",
            data: post
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};

export const PUT = async (req, res) => {

    const { text } = await req.json()
    const postId = new URL(req.url).searchParams.get("postId")
    
    if (!text) {
        return NextResponse.json({
            message: "Text is required"
        }, { status: 400 })
    }

    if (text.trim().length > 1000) {
        return NextResponse.json({
            message: "Text must be less than 1000 characters"
        }, { status: 400 })
    }

    if (text?.trim().length < 1) {
        return NextResponse.json({
            message: "Text too short"
        }, { status: 400 })
    }

    try {

        const post = await postModel.findById(postId)

        if (!post) {
            return NextResponse.json({
                message: "Post not found"
            }, { status: 404 })
        }

        post.text = text
        await post.save()

        return NextResponse.json({
            message: "Post edited successfully"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};