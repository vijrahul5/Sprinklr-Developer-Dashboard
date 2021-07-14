// libraries
import { useState, useEffect, useCallback } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import axios from "axios";

export default function useFetchEmployeeStandUp() {
    // Fetches the logged in employee's stand up for the day
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [fetch, setFetch] = useState(false);

    const fetchStandUp = useCallback(() => {
        setFetch(true);
    }, [setFetch]);

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
                NotificationManager.error("Error", err.message, 5000);
                setLoading(false);
            }
        },
        [setLoading, setData, setError]
    );

    useEffect(() => {
        apiCall();
    }, [fetch, apiCall]);

    return [loading, data, error, fetchStandUp];
}
