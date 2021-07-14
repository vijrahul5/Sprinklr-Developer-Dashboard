import React from "react";
import Navbar from "../navbar/index";
import SignIn from "../signIn/index";
import { useState } from "react";
import "../../scss/landingPage.scss";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <div className="landingPage__wrapper">
                <div className="landingPage"></div>
                <div className="signInSection">
                    <SignIn />
                </div>
            </div>
        </>
    );
}
