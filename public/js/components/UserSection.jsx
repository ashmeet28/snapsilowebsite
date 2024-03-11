import React, { useState, useEffect } from "react";

export default function UserSection() {
    const [userEmail, setUserEmail] = useState('');
    const [userCode, setUserCode] = useState('');
    const [isEmailEntered, setIsEmailEntered] = useState(false);

    useEffect(() => {
        console.log(userEmail)
        return () => {
        };
    }, [userEmail, userCode, isEmailEntered]);

    return (
        <div className="w-full max-w-[400px] mx-auto p-2 my-10">
            <h1 className="text-center p-2 text-4xl my-2">Sign In</h1>
            {!isEmailEntered ?
                <>
                    <input className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline my-2" type="text"
                        value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Email address" /><br />
                    <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded my-2"
                        onClick={() => setIsEmailEntered(true)}>Send Code</button>
                </>
                :
                <>
                    <input className="text-center shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline my-2" type="text"
                        value={userCode} onChange={(e) => setUserCode(e.target.value)}
                        placeholder="6-digit code" /><br />
                    <p className="opacity-75 text-center">Enter the code sent to your email</p>
                </>

            }
        </div>
    )
}