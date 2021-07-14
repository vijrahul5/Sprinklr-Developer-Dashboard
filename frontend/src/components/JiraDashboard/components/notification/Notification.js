import React, { useEffect } from "react";
import Pusher from "pusher-js";
import { NotificationManager } from "react-notifications";
import axios from "axios";

const channelid = process.env.REACT_APP_CHANNEL_ID_JIRA;
const notificationDisplayTime = 0; // 0 represents, it will not hide until we refresh
let cid = "";
let channel = "";
const pusher = new Pusher(channelid, {
  cluster: "ap2",
});

async function configureConnection() {
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
    NotificationManager.success(
      `${data.details.type}`,
      `${data.details.key}`,
      notificationDisplayTime
    );
  });
}
const Notification = () => {
  useEffect(() => {
    configureConnection();

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, []);

  return <></>;
};

export default Notification;
