import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";

export const useFetchEmployeeTeamData = function () {
    // Fetches Team Data and their daily standups from the backend server
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [fetch, setFetch] = useState(false);

    const apiCall = useCallback(
        async function () {
            setError(false);
            setFetch(false);
            try {
                const res = await axios.get("/api/employee/team");
                if (res.data.status === "Success") {
                    setData(res.data.teamStandUp);
                    setLoading(false);
                } else {
                    throw new Error("Employee Team Not Found");
                }
            } catch (err) {
                setLoading(false);
                setError(err.message);
                NotificationManager.error("Error!", err.message, 5000);
            }
        },
        [setLoading, setData, setError]
    );

    useEffect(() => {
        apiCall();
    }, [fetch, apiCall]);

    return [loading, data, error, setFetch];
};
