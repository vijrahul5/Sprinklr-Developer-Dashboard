import { useState, useEffect } from "react";
import axios from "axios";


export const useVerifyRoute = function (type) {
    // Used to verify with the backend server if the employee has access to this public route or not
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async function () {
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
                        window.location.replace("/signin");
                    }
                }
            } catch (err) {
                setError(err.message);
            }
        })();
    }, []);

    return [loading, error];
};
