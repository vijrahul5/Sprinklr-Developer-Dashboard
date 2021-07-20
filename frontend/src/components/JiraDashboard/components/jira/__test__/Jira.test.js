import React from "react";
import { render, waitFor } from "@testing-library/react";
import Jira from "../Jira";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import * as useAuthorize from "../../../hooks/useAuthorize";

describe("basic testing", () => {
  test("when loading is true and doneAuthentication is false", async () => {
    const history = createMemoryHistory();
    jest.spyOn(useAuthorize, "default").mockImplementation(() => ({
      showAuthPage: jest.fn(),
      doneAuthentication: false,
      loading: true,
    }));

    const { getByText } = render(
      <Router history={history}>
        <Jira user={{}} />
      </Router>
    );
    await waitFor(() => expect(getByText("Loading...")).toBeInTheDocument());
    useAuthorize.default.mockRestore();
  });
});
