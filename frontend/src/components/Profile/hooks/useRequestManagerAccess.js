import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function useRequestManagerAccess() {
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
                    throw new Error("Request Rejected !");
                }
            } catch (err) {
                setRequestError(err.message);
                NotificationManager.error("Error!", err.message, 5000);
            }
        },
        [setRequestError]
    );

    return [requestError, requestManagerAccess];
}
