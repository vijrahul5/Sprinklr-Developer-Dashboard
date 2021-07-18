import React, { useState, useEffect } from "react";
import { Button, SIZE } from "baseui/button";
import PostLearningResource from "./PostLearningResource";
import Loader from "../../loaders/Tombstone";
import useFetchLearningResources from "../hooks/useFetchLearningResources";
import LearningResource from "./LearningResource";
import { BiAddToQueue } from "react-icons/bi";
import useFetchEmployeeTeamData from "../../../hooks/useFetchEmployeeTeamData";

function Learning({ user }) {
    const [postLearningResource, setPostLearningResource] = useState(false);
    const [loading, data, error, fetchLearningResources] =
        useFetchLearningResources();
    const [teamLoading, teamData, teamError, fetchTeamData] =
        useFetchEmployeeTeamData();
    if (loading || teamLoading) {
        return (
            <div className="learning" style={{ padding: "1rem" }}>
                <h1
                    className="learning__heading"
                    style={{ margin: "0rem", marginBottom: "1rem" }}
                >
                    Learning Resources
                </h1>
                <Loader />
            </div>
        );
    }
    return (
        <>
            <div className="learning">
                <h1 className="learning__heading">
                    Learning Resources{" "}
                    <div className="learning__wrapper">
                        <BiAddToQueue
                            className="add__icon"
                            onClick={() => setPostLearningResource(true)}
                        />
                    </div>
                </h1>

                <ul className="resourceList__container">
                    <div className="resourceList__wrapper"style={{ width: "100%", height: "100%" }}>
                        {data ? (
                            <>
                                {data.map((resource) => {
                                    return (
                                        <LearningResource
                                            user={user}
                                            key={resource["_id"]}
                                            resource={resource}
                                            team={teamData}
                                            fetchLearningResources={
                                                fetchLearningResources
                                            }
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <h2>No Learning Resources Shared...</h2>
                        )}
                    </div>
                </ul>
            </div>
            {postLearningResource ? (
                <PostLearningResource
                    setPostLearningResource={setPostLearningResource}
                    fetchLearningResources={fetchLearningResources}
                />
            ) : null}
        </>
    );
}

export default Learning;
