import React, { useState } from "react";
import SearchImagesBox from "./SearchImagesBox.jsx";
import UserMenuBox from "./UserMenuBox.jsx";


export default function TopBar({ }) {
    const [isSearchingImgs, setIsSearchingImgs] = useState(true);

    return (
        <>
            <div className="flex flex-row justify-between items-center py-6 border-b">
                <div className="flex flex-row justify-center gap-4">
                    <img className="w-12" src="/svg/main-logo.svg" alt="" />
                    <h1 className="text-4xl">SnapSilo</h1>
                </div>
                <div>
                    {isSearchingImgs ?
                        <img className="w-10 cursor-pointer opacity-75" src="/svg/person-outline.svg" alt="search icon"
                            onClick={() => setIsSearchingImgs(false)} />
                        :
                        <img className="w-10 cursor-pointer opacity-75" src="/svg/search-outline.svg" alt="search icon"
                            onClick={() => setIsSearchingImgs(true)} />
                    }
                </div>
            </div >
            <div className="flex flex-row justify-center items-center py-6">
                {isSearchingImgs ?
                    <SearchImagesBox></SearchImagesBox>
                    :
                    <UserMenuBox></UserMenuBox>
                }
            </div>
        </>

    )
}