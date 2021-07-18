// libraries
import { useState, useEffect, useCallback } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import axios from "axios";

export default function useUpdateEmployeeStandUp() {
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
                console.log(res.data.status);
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
                console.log(err.message);
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
}
