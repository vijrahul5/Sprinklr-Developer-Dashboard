import React from "react";
import JqlFilter from "../JqlFilter";
import { render, screen } from "@testing-library/react";
import * as useEmployeeFilter from "../../../hooks/useEmployeeFilter";

describe("Test BasicFilter", () => {
  test("Assignee filter should appear in manager view", () => {
    jest.spyOn(useEmployeeFilter, "default").mockImplementation(() => ({
      employeeDetails: [],
    }));
    jest.spyOn(useEmployeeFilter, "default").mockImplementation(() => ({
      filters: [],
    }));
    render(
      <JqlFilter
        user={{ managerAccess: true }}
        errMessage=""
        handleSwitch={jest.fn()}
        handleClick={jest.fn()}
      />
    );
    expect(screen.queryByTestId("basicfilter-1")).toBeInTheDocument();

    useEmployeeFilter.default.mockRestore();
  });

  test("Assignee filter should not appear without manager view", () => {
    jest.spyOn(useEmployeeFilter, "default").mockImplementation(() => ({
      employeeDetails: [],
    }));
    render(
      <JqlFilter
        user={{ managerAccess: false }}
        errMessage=""
        handleSwitch={jest.fn()}
        handleClick={jest.fn()}
      />
    );
    expect(screen.queryByTestId("basicfilter-1")).not.toBeInTheDocument();
    useEmployeeFilter.default.mockRestore();
  });
});
