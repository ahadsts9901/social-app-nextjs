import { NextResponse } from "next/server";
import { postModel } from "../../schema.mjs";

export const GET = async (req, res) => {

    try {

        const page = Number(new URL(req.url).searchParams.get("page")) || 0

        const posts = await postModel.find({ isDisabled: false }).sort({ _id: -1 }).limit(20).skip(page).exec()

        return NextResponse.json({
            message: "success",
            data: posts
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};