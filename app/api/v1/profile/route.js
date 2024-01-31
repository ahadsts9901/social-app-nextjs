import "../../mongodb.mjs";
import { NextResponse } from 'next/server';
import { isValidObjectId } from "mongoose"
import { postModel, userModel } from "../../schema.mjs";
import { ObjectId } from "mongodb";

export const GET = async (req) => {

    const userId = new URL(req.url).searchParams.get("id")

    if (!userId) {
        return NextResponse.json({
            message: "User id is required"
        }, { status: 400 })
    }

    if (!isValidObjectId(userId)) {
        return NextResponse.json({
            message: "Invalid user id"
        }, { status: 400 })
    }

    try {

        const user = await userModel.findById(userId).exec()

        if (!user) {
            return NextResponse.json({
                message: "Account not found"
            }, { status: 404 })
        }

        if (user.isDisabled) {
            return NextResponse.json({
                message: "Account is disabled"
            }, { status: 400 })
        }

        if (user.isSuspended) {
            return NextResponse.json({
                message: "Account is suspended"
            }, { status: 400 })
        }

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id,
            profilePicture: user.profilePicture,
            isAdmin: user.isAdmin,
            createdOn: user.createdOn,
        }

        const userPosts = await postModel.find({ authorId: new ObjectId(userId) })
        .sort({ _id: -1 }).exec()

        return NextResponse.json({
            message: "Data fetched successfully",
            data: {
                userData: userData,
                userPosts: userPosts,
            }
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};