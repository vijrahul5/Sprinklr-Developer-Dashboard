import React from "react";
import Loader from "../../globalComponents/Loader/Loader";
import { useState, useEffect, useCallback } from "react";
import {
    useFetchEmployeeStandUp,
    useUpdateEmployeeStandUp,
} from "./standUpHooks";
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { SIZE } from "baseui/input";

function StandUp() {
    // Component for Stand Up message submission or editing
    const [value, setValue] = useState({
        question1: "",
        question2: "",
        question3: "",
    });

    const [loading, data, error] = useFetchEmployeeStandUp(); // Fetches employee's stand up for the day
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

    if (error) {
        alert(error);
    }
    if (addError) {
        alert(addError);
    }
    if (editError) {
        alert(editError);
    }

    function checkFieldEmpty() {
        for (let key in value) {
            if (value[key] === "") {
                alert("Please Fill In All The Fields");
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
    }

    function handleEdit(e) {
        // Event Listener for editing a standup
        e.preventDefault();
        if (checkFieldEmpty()) return;
        editStandUp(value);
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
            <form className="standUpForm">
                <Loader />
            </form>
        );
    }

    return (
        <>
            <form
                className="standUpForm"
                onSubmit={data ? handleEdit : handleSubmit}
            >
                <FormControl label={() => "What work was done yesterday ?"}>
                    <Textarea
                        value={value.question1}
                        name="question1"
                        className="form-control "
                        onChange={changeValue}
                        placeholder="Answer"
                        size={SIZE.mini}
                    />
                </FormControl>
                <FormControl label={() => "What is the agenda for today ?"}>
                    <Textarea
                        value={value.question2}
                        name="question2"
                        className="form-control "
                        onChange={changeValue}
                        placeholder="Answer"
                        size={SIZE.mini}
                    />
                </FormControl>
                <FormControl label={() => "What work has been done today?"}>
                    <Textarea
                        value={value.question3}
                        name="question3"
                        className="form-control inputCustom"
                        onChange={changeValue}
                        placeholder="Answer"
                        size={SIZE.mini}
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
