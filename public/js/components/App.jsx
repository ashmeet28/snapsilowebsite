import React, { useEffect, useState } from "react";

import SearchImages from "./SearchImages.jsx";
import SignInEnterEmail from "./SignInEnterEmail.jsx";
import SignInEnterCode from "./SignInEnterCode.jsx";

export default function MyApp() {
    const A_S = {
        SEARCH_IMAGES: 1,
        CHECK_IF_USER_SIGNED_IN: 2,
        SIGN_IN_ENTER_EMAIL: 3,
        SIGN_IN_ENTER_CODE: 4,
        SIGN_IN_ENTER_CODE_TRY_AGAIN: 5,
        SIGN_IN_VERIFY_CODE: 6,
        USER_IMAGES: 7,
        USER_UPLOAD_IMAGE: 8,
    };

    const [currAppSt, setCurrAppSt] = useState(A_S.SEARCH_IMAGES);
    const [userAuthToken, setUserAuthToken] = useState('');
    const [isUserAuthTokenInit, setIsUserAuthTokenInit] = useState(false);
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
            case A_S.CHECK_IF_USER_SIGNED_IN: {
                if (userAuthToken === '') {
                    setCurrAppSt(A_S.SIGN_IN_ENTER_EMAIL);
                } else {
                    setCurrAppSt(A_S.USER_IMAGES);
                }
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
                    {currAppSt === A_S.SEARCH_IMAGES ?
                        <img onClick={() => setCurrAppSt(A_S.CHECK_IF_USER_SIGNED_IN)}
                            className="h-12 opacity-75 cursor-pointer" src="/svg/person-circle-outline.svg" alt="person icon" />
                        :
                        <img onClick={() => setCurrAppSt(A_S.SEARCH_IMAGES)}
                            className="h-12 opacity-75 cursor-pointer" src="/svg/globe-outline.svg" alt="globe icon" />}
                </div>
            </div>

            {currAppSt === A_S.SEARCH_IMAGES && <SearchImages></SearchImages>}

            {(currAppSt === A_S.SIGN_IN_ENTER_EMAIL ||
                currAppSt === A_S.SIGN_IN_ENTER_CODE ||
                currAppSt === A_S.SIGN_IN_VERIFY_CODE ||
                currAppSt === A_S.SIGN_IN_ENTER_CODE_TRY_AGAIN) &&

                <div className="w-full max-w-[400px] mx-auto p-2 my-10">
                    <h1 className="text-center p-2 text-4xl my-2">Sign In</h1>

                    {currAppSt === A_S.SIGN_IN_ENTER_EMAIL &&
                        <SignInEnterEmail onEmailEntered={(v) => {
                            fetch("/api/send-code", { method: "POST", body: JSON.stringify({ email_address: v }) });
                            setUserEmail(v);
                            setCurrAppSt(A_S.SIGN_IN_ENTER_CODE);
                        }}></SignInEnterEmail>
                    }

                    {(currAppSt === A_S.SIGN_IN_ENTER_CODE ||
                        currAppSt === A_S.SIGN_IN_VERIFY_CODE ||
                        currAppSt === A_S.SIGN_IN_ENTER_CODE_TRY_AGAIN) && (
                            <>
                                <SignInEnterCode
                                    onCodeEntered={(v) => {
                                        setCurrAppSt(A_S.SIGN_IN_VERIFY_CODE)

                                        fetch("/api/verify-code", {
                                            method: "POST", body: JSON.stringify({ email_address: userEmail, verification_code: v })
                                        }).then((res) => {
                                            if (res.status === 200) {
                                                res.json().then((data) => {
                                                    setUserAuthToken(data.auth_token);
                                                    setCurrAppSt(A_S.CHECK_IF_USER_SIGNED_IN)
                                                })
                                            } else {
                                                setCurrAppSt(A_S.SIGN_IN_ENTER_CODE_TRY_AGAIN)
                                            }
                                        })
                                    }}
                                    isInputDisabled={(currAppSt === A_S.SIGN_IN_VERIFY_CODE)}>
                                </SignInEnterCode>
                                <p className="opacity-75 text-center p-2">
                                    {currAppSt === A_S.SIGN_IN_ENTER_CODE && "Enter the code sent to your email"}
                                    {currAppSt === A_S.SIGN_IN_VERIFY_CODE && "Signing in..."}
                                    {currAppSt === A_S.SIGN_IN_ENTER_CODE_TRY_AGAIN && "Try again"}
                                </p>
                            </>
                        )
                    }
                </div>
            }

            {currAppSt === A_S.USER_IMAGES &&
                <div>No Images</div>
            }
        </div >
    );
}