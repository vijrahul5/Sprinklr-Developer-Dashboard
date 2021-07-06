import React, { useEffect } from "react";
  //review-cycle-1:read about pusher js and document it
import Pusher from "pusher-js";
import { NotificationManager } from "react-notifications";
import axios from "axios";

  //review-cycle-1: why is dotenv needed
require("dotenv").config();

const channelid = process.env.REACT_APP_CHANNEL_ID_JIRA;
let cid = "";
const pusher = new Pusher(channelid, {
  cluster: "ap2",
});

const Notification = () => {
  useEffect(() => {
      //review-cycle-1: don't use IIFE. create a function outside useEffect and call it here
    (async function configureConnection() {
      let response = await axios.get("/api/jira/webhookToken");
      if (response.data.status === "Success") {
        cid = response.data.webhookId;
      } else {
          //review-cycle-1: dont use alert to show notification error. can 
        alert("Error to bind notification channel");
      }
    })();
    const channel = pusher.subscribe("my-channel");
    channel.bind(cid, function (data) {
      NotificationManager.success(
        `${data.details.type}`,
        `${data.details.key}`,
          //review-cycle-1: what is 100000000000? take it out in a constant 
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
