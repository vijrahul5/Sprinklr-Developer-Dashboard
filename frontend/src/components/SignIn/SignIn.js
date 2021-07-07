import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import Auth from "../../Auth";
import GoogleLogin from "react-google-login";
import dotenv from "dotenv";
dotenv.config();

function SignIn() {
    const [loading, setLoading] = useState(false);

    async function handleGoogleLoginSuccess({ tokenId }) {
        Auth.login(tokenId, setLoading);
    }
    async function handleGoogleLoginFailiure(res) {
        alert("Login Failed !");
        window.location.replace("/signin");
    }
    if (loading) {
        return (
            <>
                <Navbar />
                <div className="signin-container">
                    <Loader />
                </div>
            </>
        );
    }
    return (
        <>
            <Navbar />
            <div className="signin-container">
                <div className="signin">
                    <h3>Sign In</h3>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        buttonText="Continue With Google"
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailiure}
                        cookiePolicy="single_host_origin"
                    />
                </div>
            </div>
        </>
    );
}

export default SignIn;
