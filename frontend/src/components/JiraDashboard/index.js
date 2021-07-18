//libraries
import React from "react";
import PropTypes from "prop-types";

//components
import Jira from "./components/jira/Jira";
import "./styles/jira.scss";

const index = ({ user }) => {
    return <Jira user={user} />;
};

index.propTypes = {
    user: PropTypes.object,
};
export default index;
