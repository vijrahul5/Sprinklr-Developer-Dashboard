import React from "react";
import Loader from "../../globalComponents/Loader/Tombstone";
import { useState, useEffect, useCallback } from "react";
import {
    useFetchEmployeeStandUp,
    useUpdateEmployeeStandUp,
} from "./standUpHooks";
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { SIZE } from "baseui/input";
import { AiOutlineCheckCircle } from "react-icons/ai";
import NotificationManager from "react-notifications/lib/NotificationManager";

function StandUp() {
    // Component for Stand Up message submission or editing
    const [value, setValue] = useState({
        question1: "",
        question2: "",
        question3: "",
    });

    const [loading, data, error, setLoading] = useFetchEmployeeStandUp(); // Fetches employee's stand up for the day
    const [addError, editError, addStandUp, editStandUp] =
        useUpdateEmployeeStandUp(); // Provides functions for adding or deleting stand up

    useEffect(() => {
        if (data)
            setValue({
                question1: data.question1,
                question2: data.question2,
                question3: data.question3,
            });
    }, [data]);

    useEffect(() => {
        if (error) NotificationManager.error("Error", error, 5000);
    }, [error]);

    useEffect(() => {
        if (addError) NotificationManager.error("Error", addError, 5000);
    }, [addError]);

    useEffect(() => {
        if (editError) NotificationManager.error("Error", editError, 5000);
    }, [editError]);

    function checkFieldEmpty() {
        for (let key in value) {
            if (value[key] === "") {
                NotificationManager.error(
                    "Error",
                    "Fields Cannot Be Empty !",
                    5000
                );
                return true;
            }
        }
        return false;
    }
    function handleSubmit(e) {
        // Event Listener for adding a standup
        e.preventDefault();
        if (checkFieldEmpty()) return;
        addStandUp(value);
        setValue({ question1: "", question2: "", question3: "" });
        setLoading(true);
    }

    function handleEdit(e) {
        // Event Listener for editing a standup
        e.preventDefault();
        if (checkFieldEmpty()) return;
        editStandUp(value);
        setLoading(true);
    }

    const changeValue = useCallback(
        (e) => {
            let valueName = e.currentTarget.name;
            setValue({ ...value, [valueName]: e.currentTarget.value });
        },
        [setValue, value]
    );

    if (loading) {
        return (
            <form className="standUp">
                <Loader />
            </form>
        );
    }

    return (
        <>
            <form
                className="standUp"
                onSubmit={data ? handleEdit : handleSubmit}
            >
                {data ? (
                    <div className="standUp__success">
                        <AiOutlineCheckCircle className="standUp__success__icon" />
                        <h3>Submitted!</h3>
                    </div>
                ) : null}
                <FormControl label={() => "What work was done yesterday ?"}>
                    <Textarea
                        value={value.question1}
                        name="question1"
                        className="standUp__input "
                        onChange={changeValue}
                        placeholder="Answer"
                        size={SIZE.mini}
                        overrides={{
                            Root: {
                                style: ({ $theme }) => ({
                                    borderRadius: "4px",
                                }),
                            },
                        }}
                    />
                </FormControl>
                <FormControl label={() => "What is the agenda for today ?"}>
                    <Textarea
                        value={value.question2}
                        name="question2"
                        className="standUp__input "
                        onChange={changeValue}
                        placeholder="Answer"
                        size={SIZE.mini}
                        overrides={{
                            Root: {
                                style: ({ $theme }) => ({
                                    borderRadius: "4px",
                                }),
                            },
                        }}
                    />
                </FormControl>
                <FormControl label={() => "What work has been done today?"}>
                    <Textarea
                        value={value.question3}
                        name="question3"
                        className="standUp__input"
                        onChange={changeValue}
                        placeholder="Answer"
                        size={SIZE.mini}
                        overrides={{
                            Root: {
                                style: ({ $theme }) => ({
                                    borderRadius: "4px",
                                }),
                            },
                        }}
                    />
                </FormControl>
                <Button
                    type="submit"
                    className="submit btnCustom"
                    size={SIZE.compact}
                >
                    {data ? "Edit" : "Submit"}
                </Button>
            </form>
        </>
    );
}

export default StandUp;
