import React from "react";

export default function UserMenuBox({ }) {
    return (
        <div className="flex flex-row justify-center gap-4 py-2 px-4 shadow rounded">
            <div className="flex items-center justify-center gap-1 cursor-pointer">
                <img className="w-8 cursor-pointer opacity-75" src="/svg/person-circle-outline.svg" alt="" />
                <h3 className="text-lg">Profile</h3>
            </div>
            <div className="flex items-center justify-center gap-1 cursor-pointer">
                <img className="w-8 cursor-pointer opacity-75" src="/svg/image-outline.svg" alt="" />
                <h3 className="text-lg">Images</h3>
            </div>
            <div className="flex items-center justify-center gap-1 cursor-pointer">
                <img className="w-8 cursor-pointer opacity-75" src="/svg/cloud-upload-outline.svg" alt="" />
                <h3 className="text-lg">Upload</h3>
            </div>
        </div>
    )
}