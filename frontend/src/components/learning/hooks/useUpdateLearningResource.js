// libraries
import { useState, useCallback } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function useUpdateLearningResource() {
    const [updateError, setUpdateError] = useState(false);

    const updateLearningResource = useCallback(
        async function (data) {
            setUpdateError(false);
            try {
                const res = await axios.patch("/api/employee/learning", data);
                if (res.data.status === "Success") {
                    if (data.marked) {
                        NotificationManager.success(
                            "Success!",
                            "Learning Resource Marked",
                            5000
                        );
                    } else {
                        NotificationManager.success(
                            "Success!",
                            "Learning Resource Unmarked",
                            5000
                        );
                    }
                } else {
                    throw new Error(res.data.status);
                }
            } catch (err) {
                setUpdateError(err.message);
                NotificationManager.error("Error!", err.message, 5000);
            }
        },
        [setUpdateError]
    );

    return [updateError, updateLearningResource];
}
