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
    const [loading, data, error, setFetch] = useFetchEmployeeStandUp();
    const [addError, editError, addStandUp, editStandUp] =
        useUpdateEmployeeStandUp();

    useEffect(() => {
        if (data) setValue(data);
    }, [data]);

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
        setFetch(true);
    }

    function handleEdit(e) {
        e.preventDefault();
        if (checkFieldEmpty()) return;
        editStandUp(value);
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
                <h1 className="standUp__heading">Daily Progress</h1>
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
                <h1 className="standUp__heading">Daily Progress</h1>
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
