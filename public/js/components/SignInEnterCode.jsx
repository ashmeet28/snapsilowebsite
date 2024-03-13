import React, { useState, useEffect } from "react";

export default function SignInEnterCode({ onCodeEntered, isInputDisabled }) {
    const [userCode, setUserCode] = useState('');

    useEffect(() => {
        if (userCode.length === 6) { onCodeEntered(userCode); }
        return () => { };
    }, [userCode]);

    return (
        <>
            <input className="text-center shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline my-2" type="text"
                value={userCode} onChange={(e) => setUserCode(e.target.value)}
                placeholder="6-digit code" disabled={isInputDisabled} /><br />
        </>
    )
}