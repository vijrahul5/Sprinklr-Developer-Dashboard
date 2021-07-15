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

let cid = "";
let channel = "";

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
