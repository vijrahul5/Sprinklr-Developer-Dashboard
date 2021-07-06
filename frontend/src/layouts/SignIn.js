import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import Auth from "../Auth";
import GoogleLogin from "react-google-login";
import dotenv from "dotenv";

//review-cycle-1: what is dotenv?
dotenv.config();

//review-cycle-1: these components should be present under components structure and not under layout folder. Read https://blog.bitsrc.io/sharing-react-components-from-atoms-and-molecules-to-pages-2d0d722b1dba?gi=a31d933d0b8a
//review-cycle-1: convert to functional component
export default class SignIn extends Component {
    // Component for the sign in page
    async handleGoogleLoginSuccess({ tokenId }) {
        // Receives a tokenid from google if login is successful
        Auth.login(tokenId);
    }
    async handleGoogleLoginFailiure(res) {
        alert("Login Failed !");
        window.location.replace("/signin");
    }
    render() {
        return (
            <>
                <Navbar />
                <div className="signin-container">
                    <div className="signin">
                        <h3>Sign In</h3>
                        <GoogleLogin
                            //review-cycle-1: you don't need template string here
                            clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                            buttonText="Continue With Google"
                            onSuccess={this.handleGoogleLoginSuccess}
                            onFailure={this.handleGoogleLoginFailiure}
                            //review-cycle-1: can be written as cookiePolicy="single_host_origin". 
                            cookiePolicy={"single_host_origin"}
                        />
                    </div>
                </div>
            </>
        );
    }
}
