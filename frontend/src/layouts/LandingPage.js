import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";

//review-cycle-1: don't use class components
export default class LandingPage extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="home"></div>
            </>
        );
    }
}
