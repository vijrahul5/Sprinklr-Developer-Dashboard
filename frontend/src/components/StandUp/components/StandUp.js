import React from "react";
import Loader from "../../loaders/Tombstone";
import { useState, useEffect, useCallback } from "react";
import useUpdateEmployeeStandUp from "../hooks/useUpdateEmployeeStandUp";
import useFetchEmployeeStandUp from "../hooks/useFetchEmployeeStandUp";
import { Button } from "baseui/button";
import { SIZE } from "baseui/input";
import { AiOutlineCheckCircle } from "react-icons/ai";
import NotificationManager from "react-notifications/lib/NotificationManager";
import StandUpForm from "./StandUpForm";

function checkFieldEmpty(value) {
    for (let key in value) {
        if (value[key] === "") {
            NotificationManager.error("Error!", "Fields Cannot Be Empty", 5000);
            return true;
        }
    }
    return false;
}

function StandUp() {
    const [loading, data, error, fetchStandUp] = useFetchEmployeeStandUp();
    const [addError, editError, addStandUp, editStandUp] =
        useUpdateEmployeeStandUp();
    const [view, setView] = useState(true);

    function handleSubmit(data) {
        if (checkFieldEmpty(data)) return;
        addStandUp(data);
        fetchStandUp();
    }

    function handleEdit(data) {
        if (checkFieldEmpty(data)) return;
        editStandUp(data);
    }

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
                                onClick={(e) => {
                                    e.preventDefault();
                                    setView((oldView) => !oldView);
                                }}
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
