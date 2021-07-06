import React from "react";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import { useFetchEmployeeStandUp, useUpdateEmployeeStandUp } from "./standUpHooks";
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

    const [loading, data, error] = useFetchEmployeeStandUp(setValue); // Fetches employee's stand up for the day
    const [addError, editError, addStandUp, editStandUp] = useUpdateEmployeeStandUp(); // Provides functions for adding or deleting stand up

    if (error !== false) {
        alert(error);
        window.location.reload();
    }
    if (addError !== false) {
        alert(addError);
        window.location.reload();
    }
    if (editError !== false) {
        alert(editError);
        window.location.reload();
    }

    function handleSubmit(e) {
        // Event Listener for adding a standup
        e.preventDefault();
        for (let key in value) {
            if (value[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        setValue({ question1: "", question2: "", question3: "" });
        addStandUp(value);
    }

    function handleEdit(e) {
        // Event Listener for editing a standup
        e.preventDefault();
        for (let key in value) {
            if (value[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        editStandUp(value);
    }

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
                        className="form-control"
                        onChange={(e) => {
                            setValue({
                                ...value,
                                question1: e.currentTarget.value,
                            });
                        }}
                        placeholder="Answer"
                        size={SIZE.mini}
                    />
                </FormControl>
                <FormControl label={() => "What is the agenda for today ?"}>
                    <Textarea
                        value={value.question2}
                        name="question2"
                        className="form-control"
                        onChange={(e) => {
                            setValue({
                                ...value,
                                question2: e.currentTarget.value,
                            });
                        }}
                        placeholder="Answer"
                        size={SIZE.mini}
                    />
                </FormControl>
                <FormControl label={() => "What work has been done today?"}>
                    <Textarea
                        value={value.question3}
                        name="question3"
                        className="form-control"
                        onChange={(e) => {
                            setValue({
                                ...value,
                                question3: e.currentTarget.value,
                            });
                        }}
                        placeholder="Answer"
                        size={SIZE.mini}
                    />
                </FormControl>
                <Button type="submit" className="submit" size={SIZE.compact}>
                    {data ? "Edit" : "Submit"}
                </Button>
            </form>
        </>
    );
}

export default StandUp;
