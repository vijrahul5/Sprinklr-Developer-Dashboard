import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import Auth from "../Auth";
import GoogleLogin from "react-google-login";
import dotenv from "dotenv";
dotenv.config();

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
                            clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                            buttonText="Continue With Google"
                            onSuccess={this.handleGoogleLoginSuccess}
                            onFailure={this.handleGoogleLoginFailiure}
                            cookiePolicy={"single_host_origin"}
                        />
                    </div>
                </div>
            </>
        );
    }
}
