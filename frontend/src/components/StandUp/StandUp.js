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
import standUpQuestions from "./StandUpQuestions";

function StandUp() {
    const [value, setValue] = useState(Array(standUpQuestions.length).fill(""));
    const [loading, data, error, setLoading] = useFetchEmployeeStandUp();
    const [addError, editError, addStandUp, editStandUp] =
        useUpdateEmployeeStandUp();

    useEffect(() => {
        if (data) setValue(data);
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
                    "Error!",
                    "Fields Cannot Be Empty",
                    5000
                );
                return true;
            }
        }
        return false;
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (checkFieldEmpty()) return;
        addStandUp(value);
        setValue(Array(standUpQuestions.length).fill(""));
        setLoading(true);
    }

    function handleEdit(e) {
        e.preventDefault();
        if (checkFieldEmpty()) return;
        editStandUp(value);
        setLoading(true);
    }

    const changeValue = useCallback(
        (e) => {
            let questionNumber = parseInt(e.currentTarget.name, 10);
            setValue([
                ...value.slice(0, questionNumber),
                e.currentTarget.value,
                ...value.slice(questionNumber + 1),
            ]);
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
                {standUpQuestions.map(({ question, questionNumber }) => {
                    return (
                        <FormControl
                            label={() => question}
                            key={questionNumber}
                        >
                            <Textarea
                                value={value ? value[questionNumber] : ""}
                                name={questionNumber}
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
                    );
                })}
                <Button type="submit" className="btnCustom" size={SIZE.compact}>
                    {data ? "Edit" : "Submit"}
                </Button>
            </form>
        </>
    );
}

export default StandUp;
