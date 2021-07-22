// libraries
import React from "react";
import ContentLoader from "react-content-loader";
import "./styles/loader.scss";

const Tombstone = (props) => (
    <ContentLoader style={{ width: "100%", height: "500px" }} {...props}>
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="20px" />
        <rect x="0" y="30" rx="0" ry="0" width="70%" height="20px" />
        <rect x="0" y="60px" rx="0" ry="0" width="100%" height="100px" />
        <rect x="0" y="170px" rx="0" ry="0" width="70%" height="20px" />
        <rect x="0" y="200px" rx="0" ry="0" width="100%" height="100px" />
        <rect x="0" y="310px" rx="0" ry="0" width="70%" height="20px" />
        <rect x="0" y="340px" rx="0" ry="0" width="100%" height="100px" />
        <rect x="0" y="450px" rx="0" ry="0" width="20%" height="40px" />
    </ContentLoader>
);

export default Tombstone;
