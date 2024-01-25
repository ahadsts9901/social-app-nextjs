import "../../mongodb.mjs";
import { NextResponse } from 'next/server';
import { uploadOnCloudinary } from "../../cloudinary.mjs";

export const POST = async (req, res) => {

    const formData = await req.formData();
    const text = formData.get('text');
    const file = formData.get('file');

    const uploadedFile = await uploadOnCloudinary(file, "we-app-nextjs/posts")

    console.log(uploadedFile.url);

    return NextResponse.json({
        message: "success"
    })

};