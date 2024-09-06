import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        const {fullName, email, password, isCreator, instagram, youtube} = await req.json();
        console.log({
            fullName, email, password, isCreator, instagram, youtube
        });

        return NextResponse.json({success:true, message:"Account created successfully"}, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({success:false, message:"Internal Server Error..."}, {status: 500});
    }
}