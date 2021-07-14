//libraries
import React from "react";
import PropTypes from "prop-types";

//components
import Jira from "./jira/Jira";

const index = ({ user }) => {
  <Jira user={user} />;
};

index.propTypes = {
  user: PropTypes.object,
};
export default index;
