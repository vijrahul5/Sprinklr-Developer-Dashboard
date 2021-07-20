import React from "react";
import JiraAuth from "../JiraAuth";
import { render, fireEvent, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
describe("Test Authorize button", () => {
  test("Check button", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <JiraAuth />
      </Router>
    );
    expect(getByText("Authorize")).toBeInTheDocument();
  });
});
