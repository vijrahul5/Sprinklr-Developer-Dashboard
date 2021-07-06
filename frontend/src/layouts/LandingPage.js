import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";

export default class LandingPage extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="landingPage"></div>
            </>
        );
    }
}
