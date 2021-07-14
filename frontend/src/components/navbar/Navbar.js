import React, { useState } from "react";
import { AppNavBar } from "baseui/app-nav-bar";
import { TriangleRight } from "baseui/icon";

export default function Navbar({ setSignIn }) {
    return (
        <AppNavBar
            title="Sprinklr Developer Dashboard"
            overrides={{
                Root: {
                  style: ({ $theme }) => ({
                    // outline: `${$theme.colors.warning200} solid`,
                    // backgroundColor: "#eeeeee"
                  })
                }
              }}
        />
    );
}
