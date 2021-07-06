import React from "react";
import Loader from "../components/Loader/Loader";
import { useState } from "react";
import { useFetchEmployeeStandUp, useUpdateStandUp } from "../Api";
import { FormControl } from "baseui/form-control";
import { Button} from "baseui/button";
import { Textarea } from "baseui/textarea";
import {SIZE} from "baseui/input";

//review-cycle-1: this is a very big component. break it down into smaller components.
function StandUp() {
    // Component for Stand Up message submission or editing
    const [value, setValue] = useState({
        question1: "",
        question2: "",
        question3: "",
    });
    
    const [loading, data, error] = useFetchEmployeeStandUp(setValue); // Fetches employee's stand up for the day
    const [addError, editError, addStandUp, editStandUp] = useUpdateStandUp(); // Provides functions for adding or deleting stand up

    //review-cycle-1: is error a boolean?
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
        //review-cycle-1: why cant we read this data from state instead?
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        //review-cycle-1: do not manipulate dom directly. use state to empty inputs
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
        //review-cycle-1: same as above
        document.querySelectorAll(".standUpform input").forEach((element) => {
            element.value = "";
        });
        editStandUp(data);
    }

    if (loading) {
        //review-cycle-1: we should create some tombstones instead if just rendering a loader
        return (
            <form className="standUpForm">
                <Loader />
            </form>
        );
    } else {
        //review-cycle-1: no need of else here. if branch has a return statement    
        //review-cycle-1: a lot of duplicate code here for add and edit modes. take out common components.
        //review-cycle-1: make separate components for add and edit mode. you can also use bridge pattern here 
        //review-cycle-1: can we generalise this form a bit so that it is easy to added a new question in this form?
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
                                //review-cycle-1: take out function in a variable here and check if we can wrap function with useCallback react hook
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
                        //review-cycle-1: we can use onSubmit function here instead of using native form tag submit behaviour 
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
