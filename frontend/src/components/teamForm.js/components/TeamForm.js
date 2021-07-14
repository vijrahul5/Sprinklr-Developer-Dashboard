import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import useUpdateEmployeeTeam from "../hooks/useUpdateEmployeeTeam";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import NotificationManager from "react-notifications/lib/NotificationManager";
import OutsideClick from "../../../utils/OutsideClick";
import { rootOverride } from "../constants/overrides";
import checkFieldEmpty from "../../../utils/checkFieldEmpty";

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

    const handleClose = useCallback(
        (e) => {
            fetchTeamData();
            if (type === "Add") {
                setAddTeamMember(false);
            } else {
                setDeleteTeamMember(false);
            }
        },
        [setAddTeamMember, setDeleteTeamMember, fetchTeamData, type]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (checkFieldEmpty(value)) return;
            if (type === "Add") {
                setValue({ employeeEmail: "" });
                addTeamMember(value);
            } else if (type === "Delete") {
                deleteTeamMember(value);
                handleClose();
            }
        },
        [addTeamMember, deleteTeamMember, handleClose, setValue, value, type]
    );

    const handleChange = useCallback(
        (e) => {
            setValue({
                ...value,
                employeeEmail: e.currentTarget.value,
            });
        },
        [setValue, value]
    );

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
                                        onChange={handleChange}
                                        size={SIZE.compact}
                                        overrides={rootOverride}
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
