import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import Auth from "../../Auth";
import GoogleLogin from "react-google-login";
import { RiCloseCircleLine } from "react-icons/ri";
import dotenv from "dotenv";
dotenv.config();

function SignIn({setSignIn}) {
    const [loading, setLoading] = useState(false);

    async function handleGoogleLoginSuccess({ tokenId }) {
        Auth.login(tokenId, setLoading);
    }
    async function handleGoogleLoginFailiure(res) {
        alert("Login Failed !");
        window.location.reload();
    }
    function handleClose(){
        setSignIn(false);
    }
    if (loading) {
        return (
            <>
                <Loader />
            </>
        );
    }
    return (
        <>
            <div className="signin">
                <div className="signin__modal">
                    <div className="signin__modal__close">
                        <RiCloseCircleLine className="signin__modal__close__icon" onClick={handleClose}/>
                    </div>
                    <div className="signin__modal__content"> 
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
            </div>
        </>
    );
}

export default SignIn;
