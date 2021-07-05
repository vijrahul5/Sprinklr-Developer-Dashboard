import React, { useEffect } from "react";
import Pusher from "pusher-js";
import { NotificationManager } from "react-notifications";
require("dotenv").config();

const channelid = process.env.REACT_APP_CHANNEL_ID_JIRA;
const cid = localStorage.getItem("WEBHOOK");
// console.log(channelid);
const pusher = new Pusher(channelid, {
    cluster: "ap2",
});

const Notification = () => {
    useEffect(() => {
        const channel = pusher.subscribe("my-channel");
        channel.bind(cid, function (data) {
            // console.log("notification");
            NotificationManager.success(
                `${data.details.type}`,
                `${data.details.key}`,
                100000000000
            );
        });
        return () => {
            pusher.unsubscribe("my-channel");
        };
    }, []);

    return <></>;
};

export default Notification;
