//libraries
import React from "react";
import PropTypes from "prop-types";

//hooks
import { useState, useCallback, useEffect } from "react";
import useEmployeeFilter from "../../hooks/useEmployeeFilter";

//components
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { Select } from "baseui/select";

//constants
import { controlContainerOverride, rootOverride } from "./overrideConstants";

const JqlFilter = ({ errMessage, handleSwitch, handleClick, user }) => {
  const [inputValue, setInputValue] = useState(""); //change in Input JQL query
  const [error, setError] = useState(false);
  const { employeeDetails } = useEmployeeFilter(user);
  const [employeeFilterValue, setEmployeeFilterValue] = useState([
    { label: "Assigned to me", id: user.email },
  ]);
  useEffect(() => {
    setError(errMessage.length > 0 ? true : false);
  }, [errMessage]);

  const handleInputChange = useCallback((event) => {
    setError(false);
    setInputValue(event.target.value);
  }, []);

  const handleEmployeeFilter = useCallback((params) => {
    setEmployeeFilterValue(params.value);
  }, []);

  const handleClickJql = useCallback(() => {
    let jqlQuery;
    let left = `assignee in ("${employeeFilterValue[0].id}")`;
    let right = "";
    if (inputValue) {
      right = inputValue;
    }
    if (employeeFilterValue[0].id === "myteam") {
      let team = `"${user.email}"`;
      employeeDetails.map((employee) => {
        team += `,"${employee.id}"`;
      });
      left = `assignee in (${team})`;
    }
    if (inputValue) {
      jqlQuery = `${left} AND ${right}`;
    } else {
      jqlQuery = `${left}`;
    }
    handleClick(jqlQuery);
  }, [inputValue, employeeFilterValue]);

  return (
    <>
      <div className="jiraWid__search">
        <div className="jiraWid__filter">
          <FormControl caption={() => (error === true ? errMessage : "")}>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter JQL to search issues"
              clearOnEscape
              size={SIZE.compact}
              overrides={rootOverride}
              error={error}
            />
          </FormControl>
        </div>
        {user.managerAccess ? (
          <div className="jiraWid__filter" data-testid="basicfilter-1">
            <FormControl>
              <Select
                clearable={false}
                size={SIZE.compact}
                options={employeeDetails}
                value={employeeFilterValue}
                placeholder="Select Assignee"
                onChange={handleEmployeeFilter}
                overrides={controlContainerOverride}
              />
            </FormControl>
          </div>
        ) : (
          <></>
        )}

        <div className="jiraBtn__container">
          <Button
            onClick={handleClickJql}
            className="btn--blue"
            size={SIZE.compact}
            overrides={rootOverride}
          >
            search
          </Button>

          <Button
            onClick={handleSwitch}
            className="btn--white"
            size={SIZE.compact}
            overrides={rootOverride}
          >
            Switch to basic
          </Button>
        </div>
      </div>
    </>
  );
};
JqlFilter.propTypes = {
  errMessage: PropTypes.string,
  handleSwitch: PropTypes.func,
  handleClick: PropTypes.func,
};

export default JqlFilter;
