import NotificationManager from "react-notifications/lib/NotificationManager";

export default function checkFieldEmpty(value) {
    for (let key in value) {
        if (value[key] === "") {
            NotificationManager.error("Error!", "Fields Cannot Be Empty", 5000);
            return true;
        }
    }
    return false;
}
