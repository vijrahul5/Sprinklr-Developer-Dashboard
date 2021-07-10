import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetchEmployeeStandUp = function () {
    // Fetches the logged in employee's stand up for the day
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const apiCall = useCallback(
        async function () {
            try {
                const res = await axios.get("/api/employee/standup");
                if (res.data.status === "Success") {
                    setLoading(false);
                    setData(() => res.data.standUp);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setError(err.message);
            }
        },
        [setLoading, setData, setError]
    );

    useEffect(() => {
        apiCall();
    }, [loading]);

    return [loading, data, error,setLoading];
};

export const useUpdateEmployeeStandUp = function () {
    // Submits or edits the logged in employee's stand up for the day
    const [addError, setAddError] = useState(false);
    const [editError, setEditError] = useState(false);

    const addStandUp = useCallback(
        async function (data) {
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
        },
        [setAddError]
    );

    const editStandUp = useCallback(
        async function (data) {
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
        },
        [setEditError]
    );

    return [addError, editError, addStandUp, editStandUp];
};
