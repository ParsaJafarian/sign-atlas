"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/db/models/User";

export async function login(formData: { email: string, password: string, name?: string }) {
    const { email, password } = formData;
    const userId = await validateAndGetUserId(email, password);
    const session = { userId, expires: setExpiration(60) };
    await setSession(session);
}

async function validateAndGetUserId(email: string, password: string) {
    const user = await User.findOne({ email: email });
    if (!user)
        throw new Error("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
        throw new Error("Invalid email or password");

    return user._id;
}

export async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
}

/**
 * @returns instance of User model
 */
export async function getUserFromSession() {
    const session = await getSession();
    if (!session)
        throw new Error("User not authenticated");

    const user = await User.findById(session.userId);
    if (!user)
        throw new Error("User not found");

    return user;
}


async function extendSession() {
    const session = await getSession();
    const updatedSession = { ...session, expires: setExpiration() };

    await setSession(updatedSession);

    return NextResponse.next()
};

async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

/**
 * @returns boolean indicating if the user is authenticated
 */
export async function isAuthenticated() {
    try {
        const session = await getSession();
        const invalidSessionOrExpired = !session || session.expires < new Date();
        return !invalidSessionOrExpired;
    } catch (error) {
        return false;
    }
};


async function setSession(session: any) {
    const encryptedSession = await encrypt(session);
    cookies().set("session", encryptedSession, { expires: session.expires, httpOnly: true })
}

const setExpiration = (minutesFromNow: number = 15) => new Date(Date.now() + minutesFromNow * 60 * 1000);
const key = new TextEncoder().encode(process.env.SECRET_KEY);

async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15 minutes from now")
        .sign(key);
}

async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}