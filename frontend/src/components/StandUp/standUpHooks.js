import { useState, useEffect, useCallback } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import axios from "axios";

export const useFetchEmployeeStandUp = function () {
    // Fetches the logged in employee's stand up for the day
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [fetch,setFetch] = useState(false);

    const apiCall = useCallback(
        async function () {
            try {
                setError(false);
                setFetch(false);
                const res = await axios.get("/api/employee/standup");
                if (res.data.status === "Success") {
                    setLoading(false);
                    setData(() => res.data.questions);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setError(err.message);
                NotificationManager.error("Error", error, 5000);
                setLoading(false);
            }
        },
        [setLoading, setData, setError, error]
    );

    useEffect(() => {
        apiCall();
    }, [fetch, apiCall]);

    return [loading, data, error, setFetch];
};

export const useUpdateEmployeeStandUp = function () {
    // Submits or edits the logged in employee's stand up for the day
    const [addError, setAddError] = useState(false);
    const [editError, setEditError] = useState(false);

    const addStandUp = useCallback(
        async function (data) {
            setAddError(false);
            try {
                const res = await axios.post("/api/employee/standup", {
                    data: data,
                });
                if (res.data.status === "Success") {
                    NotificationManager.success(
                        "Success!",
                        "Stand Up Submitted Successfully",
                        5000
                    );
                } else {
                    throw new Error(res.data.status);
                }
            } catch (err) {
                setAddError(err.message);
                NotificationManager.error("Error", err.message, 5000);
            }
        },
        [setAddError]
    );

    const editStandUp = useCallback(
        async function (data) {
            setEditError(false);
            try {
                const res = await axios.patch("/api/employee/standup", {
                    data: data,
                });
                if (res.data.status === "Success") {
                    NotificationManager.success(
                        "Success!",
                        "Stand Up Edited Successfully !",
                        5000
                    );
                } else {
                    throw new Error(res.data.status);
                }
            } catch (err) {
                setEditError(err.message);
                NotificationManager.error("Error", err.message, 5000);
            }
        },
        [setEditError]
    );

    return [addError, editError, addStandUp, editStandUp];
};
