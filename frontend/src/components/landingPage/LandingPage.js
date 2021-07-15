//libraries
import React from "react";
// components
import Navbar from "../navbar/index";
import SignIn from "../signIn/index";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <div className="landingPage">
                <div className="landingPage__wrapper">
                    <div className="landingPage__image"></div>
                    <div className="signInSection">
                        <SignIn />
                    </div>
                </div>
            </div>
        </>
    );
}
