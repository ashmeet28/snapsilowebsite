import React, { useState } from "react";

export default function SearchSection() {
    return (
        <div className="flex flex-row justify-center">
            <div className="flex flex-row w-full max-w-screen-sm gap-4 border p-2 shadow rounded">
                <input className="grow p-2 focus:outline-none" type="text" placeholder="Search for photos" />
                <img className="w-8 cursor-pointer opacity-75" src="/svg/search.svg" alt="search icon" />
            </div>
        </div>
    )
}