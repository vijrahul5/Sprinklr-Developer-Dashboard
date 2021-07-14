// libraries
import React from "react";
import { AppNavBar } from "baseui/app-nav-bar";

export default function Navbar() {
    return (
        <AppNavBar
            title="Sprinklr Developer Dashboard"
            overrides={{
                Root: {
                    style: ({ $theme }) => ({
                        // outline: `${$theme.colors.warning200} solid`,
                        // backgroundColor: "rgb(61,130,176)"
                    }),
                },
            }}
        />
    );
}
