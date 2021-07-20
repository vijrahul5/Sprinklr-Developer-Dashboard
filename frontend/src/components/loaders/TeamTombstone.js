// libraries
import React from "react";
import ContentLoader from "react-content-loader";
import "./styles/loader.scss";

const Tombstone = (props) => (
    <ContentLoader style={{ width: "100%", height: "700px" }} {...props}>
        <rect x="0" y="0" rx="0" ry="0" width="15%" height="50px" />
        <rect x="0" y="60px" rx="0" ry="0" width="100%" height="200px" />
        <rect x="0" y="270px" rx="0" ry="0" width="100%" height="200px" />
        <rect x="0" y="480px" rx="0" ry="0" width="100%" height="200px" />
    </ContentLoader>
);

export default Tombstone;
