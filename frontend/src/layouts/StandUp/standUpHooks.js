import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchEmployeeStandUp = function (setValue) {
    // Fetches the logged in employee's stand up for the day
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    console.log("I'm created again")

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

export const useUpdateEmployeeStandUp = function () {
    // Submits or edits the logged in employee's stand up for the day
    const [addError, setAddError] = useState(false);
    const [editError, setEditError] = useState(false);

    const addStandUp = async function (data) {
        try {
            const res = await axios.post("/api/employee/standup", data);
            if (res.data.status === "Success") {
                alert("Stand Up Submitted Successfully");
                // window.location.reload();
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
                // window.location.reload();
            } else {
                throw new Error(res.data.status);
            }
        } catch (err) {
            setEditError(err.message);
        }
    };

    return [addError, editError, addStandUp, editStandUp];
};
