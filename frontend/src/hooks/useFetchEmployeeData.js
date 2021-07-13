import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function useFetchEmployeeData() {
    // Fetches Employee Data from the backend server
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const apiCall = useCallback(
        async function () {
            setError(false);
            try {
                const res = await axios.get("/api/employee/profile");
                if (res.data.status === "Success") {
                    setData(res.data.employee);
                    setLoading(false);
                } else {
                    throw new Error("Sign In First");
                }
            } catch (err) {
                setLoading(false);
                setError(err.message);
                NotificationManager.error("Error!", err.message, 5000);
            }
        },
        [setData, setLoading, setError]
    );

    useEffect(() => {
        apiCall();
    }, [apiCall]);

    return [loading, data, error];
}
