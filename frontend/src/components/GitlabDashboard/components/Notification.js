//libraries
import React from "react";
import Pusher from "pusher-js";
import axios from "axios";

//hooks
import { useEffect } from "react";

//components
import { NotificationManager } from "react-notifications";

//constants
const channelid = process.env.REACT_APP_CHANNEL_ID_JIRA;
const notificationDisplayTime = 0; // 0 represents, it will not hide until we refresh
const pusher = new Pusher(channelid, {
    cluster: "ap2",
});

let cid = "gitlabWebhook";
let channel = "";

function configureConnection() {
    channel = pusher.subscribe("gitlab-channel");
    channel.bind(cid, function (data) {
        NotificationManager.success(
            `New merge Request`,
            `Notification`,
            notificationDisplayTime
        );
    });
}
const Notification = () => {
    useEffect(() => {
        configureConnection();

        return () => {
            pusher.unsubscribe("gitlab-channel");
        };
    }, []);

    return <></>;
};

export default Notification;
