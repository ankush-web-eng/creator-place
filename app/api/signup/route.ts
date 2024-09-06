import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, password, instagram, youtube } = await req.json();

        const isUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (isUser) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.$transaction([
            prisma.user.create({
                data: {
                    name: fullName,
                    email,
                    password: hashedPassword,
                }
            }),

            prisma.creatorStore.create({
                data: {
                    youtube,
                    instagram,
                    user: {
                        connect: {
                            email
                        }
                    }
                }
            }),
            prisma.bank.create({
                data: {
                    user: {
                        connect: {
                            email
                        }
                    }
                }
            }),
            prisma.address.create({
                data: {
                    user: {
                        connect: {
                            email
                        }
                    }
                }
            })
        ]);

        const path = req.nextUrl.searchParams.get("path") || "/signup";
        revalidatePath(path);

        return NextResponse.json({ success: true, message: "Account created successfully" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error..." }, { status: 500 });
    }
}