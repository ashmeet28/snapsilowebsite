import React, { useState } from "react";

export default function SignInEnterEmail({ onEmailEntered }) {
    const [userEmail, setUserEmail] = useState('');

    return (
        <>
            <input className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline my-2" type="text"
                value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Email address" /><br />
            <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded my-2"
                onClick={() => onEmailEntered(userEmail)}>Next</button>
        </>
    )
}