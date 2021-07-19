//libraries
import React from "react";
import PropTypes from "prop-types";

//hooks
import { useState, useCallback } from "react";
import useFilters from "../../hooks/useFilters";
import useEmployeeFilter from "../../hooks/useEmployeeFilter";

//components
import { FormControl } from "baseui/form-control";
import { Button, SIZE } from "baseui/button";
import { Select } from "baseui/select";

//constant
import { controlContainerOverride, rootOverride } from "./overrideConstants";

const BasicFilter = ({ handleSwitch, setJqlQuery, user }) => {
  const { filters } = useFilters();
  const { employeeDetails } = useEmployeeFilter(user);
  const [filterValue, setFilterValue] = useState([]);
  const [employeeFilterValue, setEmployeeFilterValue] = useState([
    { label: "Assigned to me", id: user.email },
  ]);
  const handleFilter = useCallback(
    (params) => {
      setFilterValue(params.value);
      let left = "";
      let right = "";
      if (params.value.length > 0) left = `filter=${params.value[0].id}`;
      if (employeeFilterValue.length > 0)
        right = `assignee in ("${employeeFilterValue[0].id}")`;
      if (
        employeeFilterValue.length > 0 &&
        employeeFilterValue[0].id === "myteam"
      ) {
        let team = `"${user.email}"`;
        employeeDetails.map((employee) => {
          team += `,"${employee.id}"`;
        });
        right = `assignee in (${team})`;
      }
      if (params.value.length > 0 && employeeFilterValue.length > 0) {
        setJqlQuery(`${left} AND ${right}`);
      } else if (params.value.length > 0) {
        setJqlQuery(`${left}`);
      } else if (employeeFilterValue.length > 0) {
        setJqlQuery(`${right}`);
      } else {
        setJqlQuery("");
      }
    },
    [employeeFilterValue, filterValue, employeeDetails]
  );

  const handleEmployeeFilter = useCallback(
    (params) => {
      setEmployeeFilterValue(params.value);
      let left = "";
      let right = "";
      if (filterValue.length > 0) left = `filter=${filterValue[0].id}`;
      if (params.value.length > 0)
        right = `assignee in ("${params.value[0].id}")`;
      if (params.value.length > 0 && params.value[0].id === "myteam") {
        let team = `"${user.email}"`;
        employeeDetails.map((employee) => {
          team += `,"${employee.id}"`;
        });
        right = `assignee in (${team})`;
      }
      if (params.value.length > 0 && filterValue.length > 0) {
        setJqlQuery(`${left} AND ${right}`);
      } else if (params.value.length > 0) {
        setJqlQuery(`${right}`);
      } else if (filterValue.length > 0) {
        setJqlQuery(`${left}`);
      } else {
        setJqlQuery("");
      }
    },
    [filterValue, employeeFilterValue, employeeDetails]
  );
  return (
    <>
      <div className="jiraWid__search">
        <div className="jiraWid__filter">
          <FormControl>
            <Select
              size={SIZE.compact}
              options={filters}
              value={filterValue}
              placeholder="Select Filter"
              onChange={handleFilter}
              overrides={controlContainerOverride}
            />
          </FormControl>
        </div>
        {user.managerAccess ? (
          <div className="jiraWid__filter">
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

        <Button
          onClick={handleSwitch}
          className="btn--white"
          size={SIZE.compact}
          overrides={rootOverride}
        >
          Switch to jql
        </Button>
      </div>
    </>
  );
};
BasicFilter.propTypes = {
  handleSwitch: PropTypes.func,
  setJqlQuery: PropTypes.func,
  user: PropTypes.object,
};
export default BasicFilter;
