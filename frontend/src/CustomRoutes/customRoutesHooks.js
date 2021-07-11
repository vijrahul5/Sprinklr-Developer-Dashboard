import { useState, useEffect,useCallback } from "react";
import axios from "axios";

export const useVerifyRoute = function (type) {
    // Used to verify with the backend server if the employee has access to this public route or not
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const apiCall = useCallback(
        async function () {
            setError(false);
            try {
                const res = await axios.get("/api/auth/verify");
                if (type === "Public") {
                    if (res.data.status === "Failed") {
                        setLoading(false);
                    } else {
                        window.location.replace("/dashboard");
                    }
                } else {
                    if (res.data.status === "Success") {
                        setLoading(false);
                    } else {
                        window.location.replace("/");
                    }
                }
            } catch (err) {
                setError(err.message);
            }
        },
        [setLoading, setError]
    );
    useEffect(() => {
        apiCall();
    }, []);

    return [loading, error];
};
