import React from "react";
import { useState, useEffect } from "react";
import Loader from "../../globalComponents/Loader/Loader";
import { useUpdateEmployeeTeam } from "./teamFormHooks";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { RiCloseCircleLine } from "react-icons/ri";

function TeamForm({
    type,
    email,
    setAddTeamMember,
    setDeleteTeamMember,
    setLoading,
}) {
    const [value, setValue] = useState({ employeeEmail: "" });
    const [addError, deleteError, addTeamMember, deleteTeamMember] =
        useUpdateEmployeeTeam(); // Provides functions for adding or deleting a team member

    useEffect(() => {
        if (email) setValue({ employeeEmail: email });
    }, [email]);

    if (deleteError) {
        alert(deleteError);
    }
    if (addError) {
        alert(addError);
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
        if (type === "Add") addTeamMember(value);
        else if (type === "Delete") deleteTeamMember(value);
        setValue({ employeeEmail: "" });
        setLoading(true);
        if (type === "Add") {
            setAddTeamMember(false);
        } else {
            setDeleteTeamMember(false);
        }
    }

    function handleClose() {
        if (type === "Add") {
            setAddTeamMember(false);
        } else {
            setDeleteTeamMember(false);
        }
    }

    return (
        <>
            <div className="teamForm">
                <div className="teamForm__modal">
                    <div className="teamForm__modal__close">
                        <RiCloseCircleLine
                            className="teamForm__modal__close__icon"
                            onClick={handleClose}
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <FormControl label={() => `${type} Team Member`}>
                            <>
                                <Input
                                    type="text"
                                    placeholder="Enter Email"
                                    name="employeeEmail"
                                    value={value.employeeEmail}
                                    onChange={(e) => {
                                        setValue({
                                            ...value,
                                            employeeEmail:
                                                e.currentTarget.value,
                                        });
                                    }}
                                    size={SIZE.compact}
                                />
                                <Button
                                    type="submit"
                                    className="submit btnCustom ml1"
                                    size={SIZE.compact}
                                >
                                    {type}
                                </Button>
                            </>
                        </FormControl>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TeamForm;
