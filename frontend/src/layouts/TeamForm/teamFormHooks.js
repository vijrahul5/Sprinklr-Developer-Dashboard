import { useState, useCallback } from "react";
import axios from "axios";

export const useUpdateEmployeeTeam = function () {
    // Adds or Deletes a team member by sending a post/delete request to the backend server
    const [addError, setAddError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const addTeamMember = useCallback(async function (data, setValue) {
        try {
            const res = await axios.post("/api/employee/team", data);
            if (res.data.status === "Success") {
                alert("Team Member Added");
                setValue({ employeeEmail: "" });
            } else {
                throw new Error(res.data.status);
            }
        } catch (err) {
            setAddError(err.message);
            alert(err.message);
        }
    }, []);

    const deleteTeamMember = useCallback(async function (data, setValue) {
        try {
            const res = await axios.delete("/api/employee/team", {
                data: data,
            });
            if (res.data.status === "Success") {
                alert("Team Member Deleted");
                setValue({ employeeEmail: "" });
            } else {
                throw new Error(res.data.status);
            }
        } catch (err) {
            setDeleteError(err.message);
            alert(err.message);
        }
    }, []);

    return [addError, deleteError, addTeamMember, deleteTeamMember];
};
