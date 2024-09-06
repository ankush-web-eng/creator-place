import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { JWT } from 'next-auth/jwt';

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                identifier: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.identifier }
                });

                if (!user) {
                    throw new Error('No user found with this email');
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (isPasswordCorrect) {
                    return user;
                } else {
                    throw new Error('Incorrect password');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                if (account.provider === 'google') {
                    let existingUser = await prisma.user.findUnique({
                        where: { email: user.email! }
                    });

                    if (!existingUser) {
                        existingUser = await prisma.user.create({
                            data: {
                                email: user.email!,
                                name: user.name!,
                                password: '',
                            }
                        });
                    }

                    token.id = existingUser.id;
                } else {
                    token.id = user.id?.toString();
                }

                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            if (token) {
                if (session.user) {
                    session.user.id = token.id as string;
                    session.user.email = token.email as string;
                }
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: '/signin',
    },
};
