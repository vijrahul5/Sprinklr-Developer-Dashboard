import React from "react";
import Loader from "../components/Loader/Loader";
import { useState } from "react";
import { useFetchEmployeeStandUp, useUpdateStandUp } from "../Api";
import { FormControl } from "baseui/form-control";
import { Button} from "baseui/button";
import { Textarea } from "baseui/textarea";
import {SIZE} from "baseui/input";

function StandUp() {
    // Component for Stand Up message submission or editing
    const [value, setValue] = useState({
        question1: "",
        question2: "",
        question3: "",
    });
    const [loading, data, error] = useFetchEmployeeStandUp(setValue); // Fetches employee's stand up for the day
    const [addError, editError, addStandUp, editStandUp] = useUpdateStandUp(); // Provides functions for adding or deleting stand up

    if (error !== false) {
        return <h1>{error}</h1>;
    }
    if (addError !== false) {
        return <h1>{addError}</h1>;
    }
    if (editError !== false) {
        return <h1>{editError}</h1>;
    }

    function handleSubmit(e) {
        // Event Listener for adding a standup
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        document.querySelectorAll(".standUpform input").forEach((element) => {
            element.value = "";
        });
        addStandUp(data);
    }

    function handleEdit(e) {
        // Event Listener for editing a standup
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        document.querySelectorAll(".standUpform input").forEach((element) => {
            element.value = "";
        });
        editStandUp(data);
    }

    if (loading) {
        return (
            <form className="standUpForm">
                <Loader />
            </form>
        );
    } else {
        return (
            <>
                {data ? (
                    <form className="standUpForm" onSubmit={handleEdit}>
                        <FormControl
                            label={() => "What work was done yesterday ?"}
                        >
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
                                size={SIZE.mini}
                            />
                        </FormControl>
                        <FormControl
                            label={() => "What is the agenda for today ?"}
                        >
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
                                size={SIZE.mini}
                            />
                        </FormControl>
                        <FormControl
                            label={() => "What work has been done today?"}
                        >
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
                                size={SIZE.mini}
                            />
                        </FormControl>
                        <Button type="submit" className="submit" size={SIZE.compact}>
                            Edit
                        </Button>
                    </form>
                ) : (
                    <form className="standUpForm" onSubmit={handleSubmit}>
                        <FormControl
                            label={() => "What work was done yesterday ?"}
                        >
                            <Textarea
                                value={value.question1}
                                name="question1"
                                className="form-control"
                                placeholder="Answer"
                                onChange={(e) => {
                                    setValue({
                                        ...value,
                                        question1: e.currentTarget.value,
                                    });
                                }}
                                size={SIZE.mini}
                            />
                        </FormControl>
                        <FormControl
                            label={() => "What is the agenda for today ?"}
                        >
                            <Textarea
                                value={value.question2}
                                name="question2"
                                className="form-control"
                                placeholder="Answer"
                                onChange={(e) => {
                                    setValue({
                                        ...value,
                                        question2: e.currentTarget.value,
                                    });
                                }}
                                size={SIZE.mini}
                            />
                        </FormControl>
                        <FormControl
                            label={() => "What work has been done today?"}
                        >
                            <Textarea
                                value={value.question3}
                                name="question3"
                                className="form-control"
                                placeholder="Answer"
                                onChange={(e) => {
                                    setValue({
                                        ...value,
                                        question3: e.currentTarget.value,
                                    });
                                }}
                                size={SIZE.mini}
                            />
                        </FormControl>
                        <Button type="submit" className="submit" size={SIZE.compact}>
                            Submit
                        </Button>
                    </form>
                )}
            </>
        );
    }
}

export default StandUp;
