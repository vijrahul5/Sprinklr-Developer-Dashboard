import React from "react";
import Navbar from "../globalComponents/Navbar/Navbar";
import SignIn from "../globalComponents/SignIn/SignIn";
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
