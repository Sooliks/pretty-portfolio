"use server"
import {v2 as cloudinary} from 'cloudinary'
import {getServerSession} from "next-auth";
import {authConfig} from "@/configs/auth";

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

const cloudinaryConfig = cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
    secure: true
})
export const getSignature = async (folder?: string, public_id?: string): Promise<{timestamp: number, signature: string}> => {
    const session = await getServerSession(authConfig);
    if(!session) return { timestamp: 4464664, signature: "h6y457474" }

    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp,
            folder: folder,
            public_id: public_id
        },
        api_secret as string
    )
    return { timestamp, signature }
}
