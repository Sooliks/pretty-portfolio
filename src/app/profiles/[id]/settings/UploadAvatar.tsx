'use client'
import React, {useState} from 'react';
import {Button} from "@nextui-org/react";
import {getSignature} from "@/server-actions/cloudinary";
import {useSession} from "next-auth/react";

const UploadAvatar = () => {
    const [selectedImage, setSelectedImage] = useState<File | undefined>();
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const session = useSession()
    const handleUpload = () => {
        setIsLoading(true)
        getSignature('/avatars', session.data?.user.id).then(data=>{
            const formData = new FormData();
            formData.append('api_key', '738748534246193');
            formData.append('file', selectedImage as Blob);
            formData.append('folder', '/avatars')
            formData.append('public_id', session.data?.user.id || "")
            formData.append('signature', data.signature)
            formData.append('timestamp', data.timestamp.toString())
            const options: RequestInit = {
                method: 'POST',
                body: formData,
            };
            fetch(`https://api.cloudinary.com/v1_1/dqggb6cgz/image/upload`, options).then(res => {
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
            });
        });
    }
    return (
        <div>
            <h1>Аватар</h1>
            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <Button onClick={() => setSelectedImage(undefined)}>Удалить</Button>
                    {selectedImage && <Button isLoading={isLoading} onClick={handleUpload}>Загрузить</Button>}
                </div>
            )}
            <br />
            <br />
            <input
                type="file"
                name="myImage"
                max={1}
                onChange={(event) => {
                    if(!event?.target?.files)return
                    setSelectedImage(event?.target?.files[0]);
                }}
            />
        </div>
    )
};

export default UploadAvatar;