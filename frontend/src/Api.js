import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchEmployeeData = function () {
    // Fetches Employee Data from the backend server
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get("/api/employee/profile");
                if (res.data.status === "Success") {
                    setData(res.data.employee);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError("Sign In First");
                }
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        })();
    }, []);

    return [loading, data, error];
};

export const useFetchEmployeeTeamData = function () {
    // Fetches Team Data and their daily standups from the backend server
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get("/api/employee/team");
                if (res.data.status === "Success") {
                    setData(res.data.teamStandUp);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError("Employee Team Not Found");
                }
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        })();
    }, []);

    return [loading, data, error];
};

export const useUpdateTeam = function () {
    // Adds or Deletes a team member by sending a post/delete request to the backend server
    const [addError, setAddError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const addTeamMember = async function (data) {
        try {
            const res = await axios.post("/api/employee/team", data);
            if (res.data.status === "Success") {
                alert("Team Member Added");
            } else {
                throw new Error(res.data.status);
            }
        } catch (err) {
            setAddError(err.message);
            alert(err.message);
        }
    };

    const deleteTeamMember = async function (data) {
        try {
            const res = await axios.delete("/api/employee/team", {
                data: data,
            });
            if (res.data.status === "Success") {
                alert("Team Member Deleted");
            } else {
                throw new Error(res.data.status);
            }
        } catch (err) {
            setDeleteError(err.message);
            alert(err.message);
        }
    };

    return [addError, deleteError, addTeamMember, deleteTeamMember];
};

export const useFetchEmployeeStandUp = function (setValue) {
    // Fetches the logged in employee's stand up for the day
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get("/api/employee/standup");
                if (res.data.status === "Success") {
                    setLoading(false);
                    setData(() => res.data.standUp);
                    setValue(() => res.data.standUp);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setError(err.message);
            }
        })();
    }, []);

    return [loading, data, error];
};

export const useUpdateStandUp = function () {
    // Submits or edits the logged in employee's stand up for the day
    const [addError, setAddError] = useState(false);
    const [editError, setEditError] = useState(false);

    const addStandUp = async function (data) {
        try {
            const res = await axios.post("/api/employee/standup", data);
            if (res.data.status === "Success") {
                alert("Stand Up Submitted Successfully");
            } else {
                throw new Error(res.data.status);
            }
        } catch (err) {
            setAddError(err.message);
        }
    };

    const editStandUp = async function (data) {
        try {
            const res = await axios.patch("/api/employee/standup", data);
            if (res.data.status === "Success") {
                alert("Stand Up Edited Successfully");
            } else {
                throw new Error(res.data.status);
            }
        } catch (err) {
            setEditError(err.message);
        }
    };

    return [addError, editError, addStandUp, editStandUp];
};

export const useVerifyPublicRoute = function (initialLoading, initialError) {
    // Used to verify with the backend server if the employee has access to this public route or not
    const [loading, setLoading] = useState(initialLoading);
    const [error, setError] = useState(initialError);

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get("/api/auth/verify");
                if (res.data.status === "Failed") {
                    setLoading(false);
                } else {
                    window.location.replace("/dashboard");
                }
            } catch (err) {
                setError(err.message);
            }
        })();
    }, []);

    return [loading, error];
};

export const useVerifyPrivateRoute = function (initialLoading, initialError) {
    // Used to verify with the backend server if the employee has access to this private route or not
    const [loading, setLoading] = useState(initialLoading);
    const [error, setError] = useState(initialError);

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get("/api/auth/verify");
                if (res.data.status === "Success") {
                    setLoading(false);
                } else {
                    window.location.replace("/signin");
                }
            } catch (err) {
                setError(err.message);
            }
        })();
    }, []);

    return [loading, error];
};
