import { useState, useCallback, useEffect } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import axios from "axios";

export default function useFetchLearningResources() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [fetch, setFetch] = useState(false);

    const fetchLearningResources = useCallback(() => {
        setFetch(true);
    }, [setFetch]);

    const apiCall = useCallback(
        async function () {
            try {
                setError(false);
                setFetch(false);
                const res = await axios.get("/api/employee/learning");
                if (res.data.status === "Success") {
                    setLoading(false);
                    setData(() => res.data.learningResources);
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

    return [loading, data, error, fetchLearningResources];
}
