import "../../mongodb.mjs"
import { userModel } from "../../schema.mjs"
import { NextResponse } from "next/server"
import { getUserData } from "../../functions.mjs"

export const GET = async (request) => {
    try {

        const user = await getUserData(request)

        const response = await userModel.findOne({ email: user.email })

        const currentUser = {
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            _id: response._id,
            profilePhoto: response.profilePhoto,
            isAdmin: response.isAdmin,
            createdOn: response.createdOn,
        }

        return NextResponse.json({
            message: "User fetched successfully",
            data: currentUser,
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }
}