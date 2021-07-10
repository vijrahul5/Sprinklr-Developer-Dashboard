import React, { useState, useCallback } from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { Select } from "baseui/select";

import Table from "../../Table/Table";
import useFilters from "../hooks/useFilters";
import useEmployeeFilter from "../hooks/useEmployeeFilter";
import useGetJiraData from "../hooks/useGetJiraData";

const columnTitles = ["Type", "Key", "Summary", "Status", "Priority"];
const title = "All Issues";

const Widgetjira = () => {
  const [jqlQuery, setJqlQuery] = useState(""); //jqlQuery that we pass as prop to table
  const [inputValue, setInputValue] = useState(""); //change in Input JQL query
  const [filterValue, setFilterValue] = useState([]); //change in Filter dropdown
  const [employeeFilterValue, setEmployeeFilterValue] = useState([]); //change in Employee Filter dropdown
  const [basicMode, setBasicMode] = useState(false);

  const { filters } = useFilters();
  const { employeeDetails } = useEmployeeFilter();
  const { data, pageNumber, totalPages, setPageNumber, loading, errMessage } =
    useGetJiraData(jqlQuery);

  const handleInputChange = useCallback(
    (event) => {
      setInputValue(event.target.value);
    },
    [inputValue]
  );

  const handleClick = useCallback(() => {
    setJqlQuery(inputValue);
  }, [inputValue]);

  const handleFilter = useCallback(
    (params) => {
      setFilterValue(params.value);
      if (params.value.length > 0) {
        if (employeeFilterValue.length > 0) {
          setJqlQuery(
            `filter=${params.value[0].id} AND assignee in ("${employeeFilterValue[0].id}")`
          );
        } else {
          setJqlQuery(`filter=${params.value[0].id}`);
        }
      }
    },
    [employeeFilterValue]
  );

  const handleEmployeeFilter = useCallback(
    (params) => {
      setEmployeeFilterValue(params.value);
      if (params.value.length > 0) {
        if (filterValue.length > 0) {
          setJqlQuery(
            `filter=${filterValue[0].id} AND assignee in ("${params.value[0].id}")`
          );
        } else {
          setJqlQuery(`assignee in ("${params.value[0].id}")`);
        }
      }
    },
    [filterValue]
  );

  const handleSwitch = useCallback(() => {
    setBasicMode((prevMode) => !prevMode);
  }, [basicMode]);
  return (
    <>
      <div className="jiraTable">
        <div className="search mb12">
          {basicMode === false ? (
            <>
              <div className="jqlFilter">
                <FormControl caption={() => errMessage}>
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter JQL to search issues"
                    clearOnEscape
                    size={SIZE.compact}
                    overrides={{
                      Root: {
                        style: ({ $theme }) => ({
                          borderRadius: "4px",
                        }),
                      },
                    }}
                    error={errMessage.length > 0 ? true : false}
                  />
                </FormControl>
              </div>
            </>
          ) : (
            <>
              <div className="filter">
                <FormControl>
                  <Select
                    size={SIZE.compact}
                    options={filters}
                    value={filterValue}
                    placeholder="Select Filter"
                    onChange={handleFilter}
                    overrides={{
                      ControlContainer: {
                        style: ({ $theme }) => ({
                          borderRadius: "4px",
                        }),
                      },
                    }}
                  />
                </FormControl>
              </div>

              <div className="filter">
                <FormControl>
                  <Select
                    size={SIZE.compact}
                    options={employeeDetails}
                    value={employeeFilterValue}
                    placeholder="Select Assignee"
                    onChange={handleEmployeeFilter}
                    overrides={{
                      ControlContainer: {
                        style: ({ $theme }) => ({
                          borderRadius: "4px",
                        }),
                      },
                    }}
                  />
                </FormControl>
              </div>
            </>
          )}
          {basicMode === false ? (
            <Button
              onClick={handleClick}
              className="btn--blue"
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: ({ $theme }) => ({
                    borderRadius: "4px",
                  }),
                },
              }}
            >
              search
            </Button>
          ) : (
            <></>
          )}

          <Button
            onClick={handleSwitch}
            className="btn--white"
            size={SIZE.compact}
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  borderRadius: "4px",
                }),
              },
            }}
          >
            {basicMode === true ? "Switch to JQL" : "Switch to basic"}
          </Button>
        </div>

        <Table
          columnTitles={columnTitles}
          title={title}
          data={data}
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Widgetjira;
