import React from "react";
import standUpQuestions from "../../../constants/standUpQuestions";
import { useState, useEffect, useCallback } from "react";
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { SIZE } from "baseui/input";
import { rootOverride } from "../constants/overrides";

function StandUpForm({ data, handleEdit, handleSubmit, view }) {
    const [value, setValue] = useState(Array(standUpQuestions.length).fill(""));

    useEffect(() => {
        if (data) setValue(data);
    }, [data]);

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
    const editStandUp = useCallback(
        (e) => {
            e.preventDefault();
            handleEdit(value);
        },
        [handleEdit, value]
    );

    const submitStandUp = useCallback(
        (e) => {
            e.preventDefault();
            handleSubmit(value);
        },
        [handleSubmit, value]
    );
    
    return (
        <>
            {(data && view) || !data ? (
                <>
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
                                    overrides={rootOverride}
                                />
                            </FormControl>
                        );
                    })}
                    <Button
                        className="btnCustom"
                        size={SIZE.compact}
                        onClick={data ? editStandUp : submitStandUp}
                    >
                        {data ? "Edit" : "Submit"}
                    </Button>
                </>
            ) : null}
        </>
    );
}

export default StandUpForm;
