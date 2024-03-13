import React, { useEffect, useState } from "react";

import SearchImages from "./SearchImages.jsx";
import SignInEnterEmail from "./SignInEnterEmail.jsx";
import SignInEnterCode from "./SignInEnterCode.jsx";

export default function MyApp() {
    const APP_ST = {
        SEARCH_IMAGES: 1,
        CHECK_IF_USER_SIGNED_IN: 2,
        SIGN_IN_ENTER_EMAIL: 3,
        SIGN_IN_ENTER_CODE: 4,
        USER_IMAGES: 5,
        USER_UPLOAD_IMAGE: 6,
    };

    const [currAppSt, setCurrAppSt] = useState(APP_ST.SEARCH_IMAGES);
    const [userAuthToken, setUserAuthToken] = useState('');
    const [isUserAuthTokenInit, setIsUserAuthTokenInit] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        if (isUserAuthTokenInit) {
            localStorage.setItem('user_auth_token', userAuthToken);
        } else {
            if (localStorage.getItem('user_auth_token') !== null) {
                setUserAuthToken(localStorage.getItem('user_auth_token'));
            }
            setIsUserAuthTokenInit(true);
        }

        return () => { };
    }, [userAuthToken]);

    useEffect(() => {
        switch (currAppSt) {
            case APP_ST.CHECK_IF_USER_SIGNED_IN: {
                setCurrAppSt(APP_ST.SIGN_IN_ENTER_EMAIL);
            }
        }
        return () => { };
    }, [currAppSt]);

    return (
        <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex flex-row justify-between items-center py-6">
                <div className="flex flex-row gap-4 items-center">
                    <img className="h-12" src="/svg/main-logo.svg" alt="main logo" />
                    <h1 className="text-4xl">SnapSilo</h1>
                </div>

                <div className="flex flex-row">
                    {currAppSt === APP_ST.SEARCH_IMAGES ?
                        <img onClick={() => setCurrAppSt(APP_ST.CHECK_IF_USER_SIGNED_IN)}
                            className="h-12 opacity-75 cursor-pointer" src="/svg/person-circle-outline.svg" alt="person icon" />
                        :
                        <img onClick={() => setCurrAppSt(APP_ST.SEARCH_IMAGES)}
                            className="h-12 opacity-75 cursor-pointer" src="/svg/globe-outline.svg" alt="globe icon" />}
                </div>
            </div>

            {currAppSt === APP_ST.SEARCH_IMAGES && <SearchImages></SearchImages>}

            {(currAppSt === APP_ST.SIGN_IN_ENTER_EMAIL || currAppSt === APP_ST.SIGN_IN_ENTER_CODE) &&
                <div className="w-full max-w-[400px] mx-auto p-2 my-10">
                    <h1 className="text-center p-2 text-4xl my-2">Sign In</h1>

                    {currAppSt === APP_ST.SIGN_IN_ENTER_EMAIL &&
                        <SignInEnterEmail onEmailEntered={(v) => {
                            fetch("/api/send-code", { method: "POST", body: JSON.stringify({ email_address: v }) });
                            setUserEmail(v);
                            setCurrAppSt(APP_ST.SIGN_IN_ENTER_CODE);
                        }}></SignInEnterEmail>}

                    {currAppSt === APP_ST.SIGN_IN_ENTER_CODE &&
                        <SignInEnterCode onCodeEntered={(v) => {
                            fetch("/api/verify-code", {
                                method: "POST", body: JSON.stringify({ email_address: userEmail, verification_code: v })
                            }).then((res) => {
                                if (res.status === 200) {
                                    res.json().then((data) => {
                                        setUserAuthToken(data.auth_token);
                                    })
                                }
                            })
                        }}></SignInEnterCode>}
                </div>
            }
        </div >
    );
}