import React, { useState, useCallback, useEffect } from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { rootOverride } from "./overrideConstants";
import PropTypes from "prop-types";

const JqlFilter = ({ errMessage, handleSwitch, handleClick }) => {
  const [inputValue, setInputValue] = useState(""); //change in Input JQL query
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(errMessage.length > 0 ? true : false);
  }, [errMessage]);

  const handleInputChange = useCallback((event) => {
    setError(false);
    setInputValue(event.target.value);
  }, []);

  const handleClickJql = useCallback(() => {
    handleClick(inputValue);
  }, [inputValue]);

  return (
    <>
      <div className="jiraWid__search">
        <div className="jiraWid__jqlFilter">
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
