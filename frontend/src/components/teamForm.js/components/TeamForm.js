import React from "react";
import { useState, useEffect } from "react";
import useUpdateEmployeeTeam from "../hooks/useUpdateEmployeeTeam";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { RiCloseCircleLine } from "react-icons/ri";
import NotificationManager from "react-notifications/lib/NotificationManager";
import OutsideClick from "../../../utils/OutsideClick";

function TeamForm({
    type,
    email,
    setAddTeamMember,
    setDeleteTeamMember,
    fetchTeamData,
}) {
    const [value, setValue] = useState({ employeeEmail: "" });
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
        if (type === "Add") {
            setValue({ employeeEmail: "" });
            addTeamMember(value);
        } else if (type === "Delete") {
            deleteTeamMember(value);
            handleClose();
        }
    }

    function handleClose() {
        fetchTeamData();
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
                        <>
                            {type === "Add" ? (
                                <FormControl
                                    label={() => `${type} Team Member`}
                                    overrides={{
                                        Root: {
                                            style: () => ({
                                                marginBottom: 0,
                                            }),
                                        },
                                    }}
                                >
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
                                        overrides={{
                                            Root: {
                                                style: () => ({
                                                    borderRadius: "4px",
                                                }),
                                            },
                                        }}
                                    />
                                </FormControl>
                            ) : (
                                <h2>
                                    Are you sure you want to to delete:{" "}
                                    <span>{value.employeeEmail}</span> ?
                                </h2>
                            )}
                        </>
                        <div className="teamForm__btnHolder">
                            <Button
                                type="submit"
                                className="submit btnCustom--tertiary "
                                size={SIZE.compact}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="submit btnCustom ml12"
                                size={SIZE.compact}
                            >
                                {type}
                            </Button>
                        </div>
                    </form>
                </OutsideClick>
            </div>
        </>
    );
}

export default TeamForm;
