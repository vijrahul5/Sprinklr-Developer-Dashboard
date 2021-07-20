// libraries
import React from "react";
import ContentLoader from "react-content-loader";
import "./styles/loader.scss";

const Tombstone = (props) => (
    <ContentLoader style={{ width: "100%", height: "300px" }} {...props}>
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
    </ContentLoader>
);

export default Tombstone;
