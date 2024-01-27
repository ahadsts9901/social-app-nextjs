import "../../mongodb.mjs";
import { NextResponse } from 'next/server';
import { uploadOnCloudinary } from "../../cloudinary.mjs";
import { getUserData } from "../../functions.mjs";
import { postModel } from "../../schema.mjs";

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