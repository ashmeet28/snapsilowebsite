import React, { useState } from "react";

import SearchSection from "./SearchSection.jsx";
import UserSection from "./UserSection.jsx";

export default function MyApp() {
    const [isSearchingImages, setIsSearchingImages] = useState(true);


    return (
        <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex flex-row justify-between items-center py-6">
                <div className="flex flex-row gap-4 items-center">
                    <img className="h-12" src="/svg/main-logo.svg" alt="main logo" />
                    <h1 className="text-4xl">SnapSilo</h1>
                </div>

                <div className="flex flex-row">
                    {isSearchingImages ?
                        <img onClick={() => setIsSearchingImages(false)}
                            className="h-12 opacity-75 cursor-pointer" src="/svg/person-circle-outline.svg" alt="person icon" />
                        :
                        <img onClick={() => setIsSearchingImages(true)}
                            className="h-12 opacity-75 cursor-pointer" src="/svg/globe-outline.svg" alt="globe icon" />}
                </div>
            </div>

            {isSearchingImages ? <SearchSection></SearchSection> : <UserSection></UserSection>}
        </div >
    );
}