import React, { useEffect } from "react";
import Pusher from "pusher-js";
import { NotificationManager } from "react-notifications";
import axios from "axios";
require("dotenv").config();

const channelid = process.env.REACT_APP_CHANNEL_ID_JIRA;
let cid = "";
const pusher = new Pusher(channelid, {
  cluster: "ap2",
});

const Notification = () => {
  useEffect(() => {
    (async function configureConnection() {
      let response = await axios.get("/api/jira/webhookToken");
      if (response.data.status === "Success") {
        cid = response.data.webhookId;
      } else {
        alert("Error to bind notification channel");
      }
    })();
    const channel = pusher.subscribe("my-channel");
    channel.bind(cid, function (data) {
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
