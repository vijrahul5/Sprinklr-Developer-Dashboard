import React from "react";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { useUpdateEmployeeTeam } from "./teamFormHooks";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";

function TeamForm({ type }) {
    const [value, setValue] = useState({ employeeEmail: "" });
    const [loading, setLoading] = useState(true);
    const [addError, deleteError, addTeamMember, deleteTeamMember] =
        useUpdateEmployeeTeam(); // Provides functions for adding or deleting a team member

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (deleteError !== false) {
        alert(deleteError);
        window.location.reload();
    }
    if (addError !== false) {
        alert(addError);
        window.location.reload();
    }
    async function handleSubmit(e) {
        // Event listener for adding a team member
        e.preventDefault();
        for (let key in value) {
            if (value[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        setValue({ employeeEmail: "" });
        if (type === "Add") addTeamMember(value);
        else if (type === "Delete") deleteTeamMember(value);
    }

    if (loading === true) {
        return (
            <>
                <form className="teamForm" id={`teamForm${type}`}>
                    <Loader />
                </form>
            </>
        );
    }
    return (
        <>
            <form
                className="teamForm"
                onSubmit={handleSubmit}
                id={`teamForm${type}`}
            >
                <FormControl
                    label={() => `${type} Team Member`}
                    className="form-control"
                >
                    <>
                        <Input
                            type="text"
                            placeholder="Enter Email"
                            name="employeeEmail"
                            className="form-control"
                            value={value.employeeEmail}
                            onChange={(e) => {
                                setValue((prevValue) => {
                                    return {
                                        ...prevValue,
                                        employeeEmail: e.currentTarget.value,
                                    };
                                });
                            }}
                            size={SIZE.compact}
                        />
                        <Button
                            type="submit"
                            className="submit"
                            size={SIZE.compact}
                        >
                            {type}
                        </Button>
                    </>
                </FormControl>
            </form>
        </>
    );
}

export default TeamForm;
