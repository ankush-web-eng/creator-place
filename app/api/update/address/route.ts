import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { email, appartment, area, zip, city, state, country } = await req.json();

        const isUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!isUser) {
            return NextResponse.json({ success: false, message: "User does not exists" }, { status: 400 });
        };

        await prisma.address.update({
            where: {
                userId: isUser.id
            },
            data: {
                appartment,
                area,
                zip,
                city,
                state,
                country
            }
        });
        
        const path = req.nextUrl.searchParams.get("path") || "/";
        revalidatePath(path);

        return NextResponse.json({ success: true, message: "Account created successfully" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error..." }, { status: 500 });
    }
}