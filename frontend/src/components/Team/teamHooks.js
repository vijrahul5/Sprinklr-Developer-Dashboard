import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetchEmployeeTeamData = function () {
    // Fetches Team Data and their daily standups from the backend server
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const apiCall = useCallback(async function () {
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
    }, []);

    useEffect(() => {
        apiCall();
    }, []);

    return [loading, data, error];
};
