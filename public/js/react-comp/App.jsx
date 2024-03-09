import React, { useState } from "react";

export default function MyApp() {
    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-row justify-between items-center py-6">
                <div className="flex flex-row gap-4">
                    <img src="/svg/main-logo.svg" alt="main logo" />
                    <h1 className="text-4xl">SnapSilo</h1>
                </div>

                <div className="flex flex-row">
                    <img className="w-8 cursor-pointer" src="/svg/person-outline.svg" alt="person icon" />
                    <img className="w-8 cursor-pointer" src="/svg/globe-outline.svg" alt="globe icon" />
                </div>
            </div>

            <div className="flex flex-row justify-center">
                <div className="flex flex-row gap-4 border py-2 px-6 rounded">
                    <input className="w-[500px] p-2" type="text" placeholder="Search for photos" />
                    <img className="w-8 cursor-pointer" src="/svg/search.svg" alt="search icon" />
                </div>
            </div>
        </div >
    );
}