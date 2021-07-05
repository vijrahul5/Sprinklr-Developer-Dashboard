import React from "react";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { useUpdateTeam } from "../Api";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";

function TeamForm() {
    const [loading, setLoading] = useState(true);
    const [addError, deleteError, addTeamMember, deleteTeamMember] =
        useUpdateTeam(); // Provides functions for adding or deleting a team member

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (deleteError !== false) {
        return <h1>{deleteError}</h1>;
    }
    if (addError !== false) {
        return <h1>{addError}</h1>;
    }
    async function handleAddBtn(e) {
        // Event listener for adding a team member
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        document.querySelectorAll(".teamForm input").forEach((element) => {
            element.value = "";
        });
        addTeamMember(data);
    }
    async function handleDeleteBtn(e) {
        // Event Listener for deleting a team member
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        document.querySelectorAll(".teamForm input").forEach((element) => {
            element.value = "";
        });
        deleteTeamMember(data);
    }

    if (loading === true) {
        return (
            <>
                <form className="teamForm" id="teamForm1">
                    <Loader />
                </form>
                <form className="teamForm" id="teamForm2">
                    <Loader />
                </form>
            </>
        );
    } else {
        return (
            <>
                <form
                    className="teamForm"
                    onSubmit={handleAddBtn}
                    id="teamForm1"
                >
                    <FormControl
                        label={() => "Add Team Member"}
                        className="form-control"
                    >
                        <>
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                name="employeeEmail"
                                className="form-control"
                                size={SIZE.compact}
                            />
                            <Button
                                type="submit"
                                className="submit"
                                size={SIZE.compact}
                            >
                                Add
                            </Button>
                        </>
                    </FormControl>
                </form>
                <form
                    className="teamForm"
                    onSubmit={handleDeleteBtn}
                    id="teamForm2"
                >
                    <FormControl
                        label={() => "Delete Team Member"}
                        className="form-control"
                    >
                        <>
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                name="employeeEmail"
                                className="form-control"
                                size={SIZE.compact}
                            />
                            <Button
                                type="submit"
                                className="submit"
                                size={SIZE.compact}
                            >
                                Delete
                            </Button>
                        </>
                    </FormControl>
                </form>
            </>
        );
    }
}

export default TeamForm;
