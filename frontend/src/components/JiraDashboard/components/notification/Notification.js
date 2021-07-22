//libraries
import React from "react";
import Pusher from "pusher-js";
import axios from "axios";

//hooks
import { useEffect } from "react";

//components
import { NotificationManager } from "react-notifications";
import noti from "../../../../assets/noti.wav";

//constants
const channelid = process.env.REACT_APP_CHANNEL_ID_JIRA;
const notificationDisplayTime = 0; // 0 represents, it will not hide until we refresh
const pusher = new Pusher(channelid, {
  cluster: "ap2",
});

let cid = "";
let channel = "";

async function configureConnection(user) {
  let response = await axios.get("/api/jira/webhookToken");
  if (response.data.status === "Success") {
    cid = response.data.webhookId;
  } else {
    NotificationManager.error(
      "Server Error",
      "Can't bind to notification channel",
      notificationDisplayTime
    );
  }

  channel = pusher.subscribe("my-channel");
  channel.bind(cid, function (data) {
    const url = user.jiraBaseUrl + "/browse" + `/${data.details.key}`;
    NotificationManager.info(
      <a href={url} className="notification__url">
        {data.details.key}
      </a>,
      `${data.details.type}`,
      notificationDisplayTime
    );
    const audioEl = document.getElementsByClassName("audio-element-jira")[0];
    audioEl.currentTime = 0;
    audioEl.play();
  });
}
const Notification = ({ user }) => {
  useEffect(() => {
    configureConnection(user);

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, []);

  return (
    <audio className="audio-element-jira">
      <source src={noti}></source>
    </audio>
  );
};

export default Notification;