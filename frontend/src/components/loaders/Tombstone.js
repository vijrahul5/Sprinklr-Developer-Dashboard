// libraries
import React from "react";
import ContentLoader from "react-content-loader";
import "./styles/loader.scss";

const Tombstone = (props) => (
    <ContentLoader viewBox="0 0 50 50" {...props}>
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
    </ContentLoader>
);

export default Tombstone;
