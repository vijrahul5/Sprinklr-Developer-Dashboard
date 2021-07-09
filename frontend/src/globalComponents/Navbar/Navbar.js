import * as React from "react";
import { AppNavBar } from "baseui/app-nav-bar";
import { TriangleRight } from "baseui/icon";

export default function Navbar() {
    const [mainItems, setMainItems] = React.useState([
        { icon: TriangleRight, label: "Home", link: "/" },
        { icon: TriangleRight, label: "SignIn", link: "/signin" },
    ]);
    function handleMainItemSelect(item) {
        window.location.replace(item.link);
    }
    return (
        <AppNavBar
            title="Sprinklr Developer Dashboard"
            mainItems={mainItems}
            onMainItemSelect={handleMainItemSelect}
        />
    );
}
