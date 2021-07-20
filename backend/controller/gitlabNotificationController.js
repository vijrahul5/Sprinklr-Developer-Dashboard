const Pusher = require("pusher");
require("dotenv").config();

const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: "ap2",
    useTLS: true,
});

function handleNotification(req, res) {
    res.sendStatus(200);
    // console.log("req",req.body);
    pusher.trigger("gitlab-channel", `gitlabWebhook`, {
        details: req.body,
    });
}

module.exports.handleNotification = handleNotification;
