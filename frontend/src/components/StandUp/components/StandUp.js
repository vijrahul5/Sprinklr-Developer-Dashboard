// libraries
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "baseui/button";
import { SIZE } from "baseui/input";
import { AiOutlineCheckCircle } from "react-icons/ai";
// components
import Loader from "../../loaders/Tombstone";
import StandUpForm from "./StandUpForm";
// hooks
import useUpdateEmployeeStandUp from "../hooks/useUpdateEmployeeStandUp";
import useFetchEmployeeStandUp from "../hooks/useFetchEmployeeStandUp";
// utilities
import checkFieldEmpty from "../../../utils/checkFieldEmpty";

function StandUp() {
    const [loading, data, error, fetchStandUp] = useFetchEmployeeStandUp();
    const [addError, editError, addStandUp, editStandUp] =
        useUpdateEmployeeStandUp();
    const [view, setView] = useState(true);

    const handleSubmit = useCallback(
        (data) => {
            if (checkFieldEmpty(data)) return;
            addStandUp(data);
            fetchStandUp();
        },
        [fetchStandUp, addStandUp]
    );

    const handleEdit = useCallback(
        (data) => {
            if (checkFieldEmpty(data)) return;
            editStandUp(data);
        },
        [editStandUp]
    );

    const handleViewChange = useCallback(
        (e) => {
            e.preventDefault();
            setView((oldView) => !oldView);
        },
        [setView]
    );

    if (loading) {
        return (
            <form className="standUp">
                <h1 className="standUp__heading">Daily Progress</h1>
                <Loader />
            </form>
        );
    }

    return (
        <>
            <form className="standUp">
                <h1 className="standUp__heading">Daily Progress</h1>
                {data ? (
                    <div className="standUp__success">
                        <AiOutlineCheckCircle className="standUp__success__icon" />
                        <h3>Submitted!</h3>
                        <div>
                            <Button
                                className={
                                    view
                                        ? "btnCustom--tertiary ml1"
                                        : "btnCustom ml1"
                                }
                                size={SIZE.mini}
                                onClick={handleViewChange}
                            >
                                {view ? "Close" : "View Response"}
                            </Button>
                        </div>
                    </div>
                ) : null}
                <StandUpForm
                    data={data}
                    handleEdit={handleEdit}
                    handleSubmit={handleSubmit}
                    view={view}
                />
            </form>
        </>
    );
}

export default StandUp;
