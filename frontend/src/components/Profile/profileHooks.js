import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";

export const useFetchEmployeeData = function () {
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
                    setLoading(false);
                    setError("Sign In First");
                }
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        },
        [setData, setLoading, setError]
    );

    useEffect(() => {
        apiCall();
    }, []);

    return [loading, data, error];
};

export const useRequestManagerAccess = function () {
    // Fetches Employee Data from the backend server
    const [requestError, setRequestError] = useState(false);

    const requestManagerAccess = useCallback(
        async function () {
            setRequestError(false);
            try {
                const res = await axios.get("/api/employee/manageraccess");
                if (res.data.status === "Success") {
                    NotificationManager.success(
                        "Success!",
                        "Request Granted!",
                        5000
                    );
                    window.location.reload();
                } else {
                    setRequestError("Request Rejected!");
                }
            } catch (err) {
                setRequestError(err.message);
            }
        },
        [setRequestError]
    );

    return [requestError, requestManagerAccess];
};
