import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formdata = await req.formData()
        const file = formdata.get('file') as File;
        const email = formdata.get('email') as string;

        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)

        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer)
        })

        if (!uploadResponse) {
            return NextResponse.json({ success: false, message: "Error uploading image!" }, { status: 500 });
        }

        const url = (uploadResponse as { secure_url: string }).secure_url;

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });
        }

        await prisma.user.update({
            where: {
                email
            },
            data: {
                image: url
            }
        });

        return NextResponse.json({ success: true, message: "Profile picture updated successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
    }
}