import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { email, instagram, youtube, url, genre, account, pan, gst } = await req.json();

        const isUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!isUser) {
            return NextResponse.json({ success: false, message: "User does not exists" }, { status: 400 });
        };

        await prisma.$transaction([
            prisma.creatorStore.update({
                where: {
                    userId: isUser.id,
                },
                data: {
                    url,
                    instagram,
                    youtube,
                    genre,
                }
            }),
            prisma.bank.update({
                where: {
                    userId: isUser.id,
                },
                data: {
                    account,
                    pan,
                    gst,
                }
            })
        ]);

        const path = req.nextUrl.searchParams.get("path") || "/";
        revalidatePath(path);

        return NextResponse.json({ success: true, message: "Store updated successfully" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error..." }, { status: 500 });
    }
}