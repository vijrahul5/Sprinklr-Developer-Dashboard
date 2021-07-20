import React from "react";
import BasicFilter from "../BasicFilter";
import { render, screen } from "@testing-library/react";
import * as useEmployeeFilter from "../../../hooks/useEmployeeFilter";
import * as useFilters from "../../../hooks/useFilters";

describe("Test BasicFilter", () => {
  test("Assignee filter should appear in manager view", () => {
    jest.spyOn(useEmployeeFilter, "default").mockImplementation(() => ({
      employeeDetails: [],
    }));
    jest.spyOn(useFilters, "default").mockImplementation(() => ({
      filters: [],
    }));
    render(
      <BasicFilter
        handleSwitch={jest.fn()}
        setJqlQuery={jest.fn()}
        user={{ managerAccess: true }}
      />
    );
    expect(screen.queryByTestId("basicfilter-1")).toBeInTheDocument();
    expect(screen.queryByTestId("basicfilter-2")).toBeInTheDocument();

    useEmployeeFilter.default.mockRestore();
    useFilters.default.mockRestore();
  });

  test("Assignee filter should not appear without manager view", () => {
    jest.spyOn(useEmployeeFilter, "default").mockImplementation(() => ({
      employeeDetails: [],
    }));
    jest.spyOn(useFilters, "default").mockImplementation(() => ({
      filters: [],
    }));
    render(
      <BasicFilter
        handleSwitch={jest.fn()}
        setJqlQuery={jest.fn()}
        user={{ managerAccess: false }}
      />
    );
    expect(screen.queryByTestId("basicfilter-1")).toBeInTheDocument();
    expect(screen.queryByTestId("basicfilter-2")).not.toBeInTheDocument();
    useEmployeeFilter.default.mockRestore();
    useFilters.default.mockRestore();
  });
});
