import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetchEmployeeData = function () {
    // Fetches Employee Data from the backend server
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const apiCall = useCallback(
        async function () {
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
            try {
                const res = await axios.get("/api/employee/manageraccess");
                if (res.data.status === "Success") {
                    alert("Request Granted !");
                    window.location.reload();
                } else {
                    setRequestError(res.data.status);
                }
            } catch (err) {
                setRequestError(err.message);
            }
        },
        [setRequestError]
    );

    return [requestError, requestManagerAccess];
};
