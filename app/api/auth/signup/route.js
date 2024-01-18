import "../../mongodb.mjs";
import { userModel } from "../../schema.mjs";
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req, res) => {

    const { firstName, lastName, email, password } = await req.json();

    return NextResponse.json({
        message: "success",
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }
    });
};