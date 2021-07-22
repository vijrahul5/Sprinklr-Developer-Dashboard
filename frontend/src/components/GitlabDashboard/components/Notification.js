//libraries
import React from "react";
import Pusher from "pusher-js";

//hooks
import { useEffect } from "react";

//components
import { NotificationManager } from "react-notifications";
import noti from "../../../../src/assets/noti.wav";
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
        if (
            data.details !== undefined &&
            data.details.object_attributes !== undefined
        ) {
            NotificationManager.info(
                <a
                    href={data.details.object_attributes.url}
                    style={{ color: "white" }}
                >
                    {data.details.object_attributes.title}
                </a>,
                `${data.details.object_attributes.source.name}`,
                notificationDisplayTime
            );
        }

        const audioEl = document.getElementsByClassName(
            "audio-element-gitlab"
        )[0];
        audioEl.currentTime = 0;
        audioEl.play();

    });
}
const Notification = () => {
    useEffect(() => {
        configureConnection();

        return () => {
            pusher.unsubscribe("gitlab-channel");
        };
    }, []);

    return (
        <>
            <audio className="audio-element-gitlab">
                <source src={noti}></source>
            </audio>
        </>
    );
};

export default Notification;
