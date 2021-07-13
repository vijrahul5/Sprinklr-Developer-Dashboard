import React, { useState, useCallback } from "react";

import { FormControl } from "baseui/form-control";
import { Button, SIZE } from "baseui/button";
import { Select } from "baseui/select";
import useFilters from "../../hooks/useFilters";
import useEmployeeFilter from "../../hooks/useEmployeeFilter";
import { controlContainerOverride, rootOverride } from "./overrideConstants";
import PropTypes from "prop-types";

const BasicFilter = ({ handleSwitch, setJqlQuery }) => {
  const { filters } = useFilters();
  const { employeeDetails } = useEmployeeFilter();
  const [filterValue, setFilterValue] = useState([]); //change in Filter dropdown
  const [employeeFilterValue, setEmployeeFilterValue] = useState([]); //change in Employee Filter dropdown

  const handleFilter = useCallback(
    (params) => {
      setFilterValue(params.value);
      if (params.value.length > 0 && employeeFilterValue.length > 0) {
        setJqlQuery(
          `filter=${params.value[0].id} AND assignee in ("${employeeFilterValue[0].id}")`
        );
      } else if (params.value.length > 0) {
        setJqlQuery(`filter=${params.value[0].id}`);
      } else if (employeeFilterValue.length > 0) {
        setJqlQuery(`assignee in ("${employeeFilterValue[0].id}")`);
      } else {
        setJqlQuery("");
      }
    },
    [employeeFilterValue, filterValue]
  );

  const handleEmployeeFilter = useCallback(
    (params) => {
      setEmployeeFilterValue(params.value);
      if (params.value.length > 0 && filterValue.length > 0) {
        setJqlQuery(
          `filter=${filterValue[0].id} AND assignee in ("${params.value[0].id}")`
        );
      } else if (params.value.length > 0) {
        setJqlQuery(`assignee in ("${params.value[0].id}")`);
      } else if (filterValue.length > 0) {
        setJqlQuery(`filter=${filterValue[0].id}`);
      } else {
        setJqlQuery("");
      }
    },
    [filterValue, employeeFilterValue]
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

        <div className="jiraWid__filter">
          <FormControl>
            <Select
              size={SIZE.compact}
              options={employeeDetails}
              value={employeeFilterValue}
              placeholder="Select Assignee"
              onChange={handleEmployeeFilter}
              overrides={controlContainerOverride}
            />
          </FormControl>
        </div>
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
};
export default BasicFilter;
