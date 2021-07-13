import React from "react";
import Navbar from "./navbar/Navbar";
import SignIn from "./signIn/SignIn";
import { useState } from "react";
export default function LandingPage() {
    const [signIn, setSignIn] = useState(false);
    return (
        <>
            <Navbar setSignIn={setSignIn} />
            <div className="landingPage">
                {signIn ? <SignIn setSignIn={setSignIn} /> : null}
            </div>
        </>
    );
}
