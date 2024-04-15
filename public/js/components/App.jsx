import React from "react";
import TopBar from "./TopBar.jsx";
import UserSignIn from "./UserSignIn.jsx"

export default function App() {
    return (
        <div className="max-w-screen-2xl mx-auto px-4">
            <TopBar></TopBar>
            <UserSignIn onSignIn={(v) => console.log(v)}></UserSignIn>
        </div>
    )
}