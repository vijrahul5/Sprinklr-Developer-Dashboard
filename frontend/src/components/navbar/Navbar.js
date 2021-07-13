import React, { useState } from "react";
import { AppNavBar } from "baseui/app-nav-bar";
import { TriangleRight } from "baseui/icon";

export default function Navbar({ setSignIn }) {
    const [mainItems, setMainItems] = useState([
        { icon: TriangleRight, label: "SignIn" },
    ]);
    function handleMainItemSelect(item) {
        setSignIn(true);
    }
    return (
        <AppNavBar
            title="Sprinklr Developer Dashboard"
            mainItems={mainItems}
            onMainItemSelect={handleMainItemSelect}
        />
    );
}
