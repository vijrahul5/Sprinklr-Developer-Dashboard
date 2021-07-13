import React from "react";
import Navbar from "../navbar/index";
import SignIn from "../signIn/index";
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
