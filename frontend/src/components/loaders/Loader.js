// libraries
import React from "react";
import { Spinner } from "baseui/spinner";
import "./styles/loader.scss";

function Loader() {
    return (
        <div className="loader">
            <Spinner ></Spinner>
        </div>
    );
}

export default Loader;
