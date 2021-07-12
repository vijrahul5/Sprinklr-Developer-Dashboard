import React from "react";
import { useState, useEffect } from "react";
import { useUpdateEmployeeTeam } from "./teamFormHooks";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { RiCloseCircleLine } from "react-icons/ri";
import NotificationManager from "react-notifications/lib/NotificationManager";
import OutsideClick from "../../globalComponents/OutsideClick";

function TeamForm({
    type,
    email,
    setAddTeamMember,
    setDeleteTeamMember,
    setFetch,
}) {
    const [value, setValue] = useState({ employeeEmail: "" });
    const [didUpdate, setDidUpdate] = useState(false);
    const [addError, deleteError, addTeamMember, deleteTeamMember] =
        useUpdateEmployeeTeam(); // Provides functions for adding or deleting a team member

    useEffect(() => {
        if (email) setValue({ employeeEmail: email });
    }, [email]);

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
    async function handleSubmit(e) {
        // Event listener for adding a team member
        e.preventDefault();
        if (checkFieldEmpty()) return;
        setValue({ employeeEmail: "" });
        if (type === "Add") addTeamMember(value);
        else if (type === "Delete") {
            if (window.confirm("Are you sure you want to delete ?")) {
                deleteTeamMember(value);
            }
        }
        setDidUpdate(true);
    }

    function handleClose() {
        if (didUpdate) setFetch(true);
        if (type === "Add") {
            setAddTeamMember(false);
        } else {
            setDeleteTeamMember(false);
        }
    }

    return (
        <>
            <div className="teamForm">
                <OutsideClick handleClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <div className="teamForm__modal__close">
                            <RiCloseCircleLine
                                className="teamForm__modal__close__icon"
                                onClick={handleClose}
                            />
                        </div>
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
                </OutsideClick>
            </div>
        </>
    );
}

export default TeamForm;
