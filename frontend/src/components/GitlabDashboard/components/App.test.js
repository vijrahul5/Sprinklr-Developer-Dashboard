import React from "react";
import ReactDom from "react-dom";
import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import { render, fireEvent, screen } from "@testing-library/react";
import GitlabAccessTokenForm from "./GitlabAccessTokenForm";

test("basic testing", () => {
    const { getByTestId } = render(<GitlabAccessTokenForm />);
    const ele = getByTestId("btn");
    const formDiv = getByTestId("form");
    expect(ele.textContent).toBe("Submit Token");
    expect(ele).toBeInTheDocument();
    expect(formDiv).toBeInTheDocument();
});
