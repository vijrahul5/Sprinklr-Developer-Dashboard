// libraries
import React, { useState, useEffect } from "react";
import { Button, SIZE } from "baseui/button";
import { BiAddToQueue } from "react-icons/bi";
// components
import PostLearningResource from "./PostLearningResource";
import Loader from "../../loaders/Tombstone";
import LearningResource from "./LearningResource";
// hooks
import useFetchLearningResources from "../hooks/useFetchLearningResources";
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
                    Learning Resources
                    {user.managerAccess || user.manager ? (
                        <div className="learning__wrapper">
                            <BiAddToQueue
                                className="add__icon"
                                onClick={() => setPostLearningResource(true)}
                            />
                        </div>
                    ) : null}
                </h1>
                {data && data.length ? (
                    <div className="resourceList__container">
                        <ul
                            className="resourceList__wrapper"
                            style={{ width: "100%", height: "100%" }}
                        >
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
                        </ul>
                    </div>
                ) : null}
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
