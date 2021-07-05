require("dotenv").config();

const server_url = process.env.REACT_APP_SERVER_URL_JIRA;

const JiraAuthApi = () => {
    async function registerWebhoook(URL, ACCESS_TOKEN, CLOUD_ID) {
        localStorage.setItem("HARSH", server_url);
        let data = await fetch(URL, {
            body: JSON.stringify({
                webhooks: [
                    {
                        jqlFilter: "project != DEMO OR project = DEMO",
                        events: ["jira:issue_created", "jira:issue_updated"],
                    },
                ],
                url: `${server_url}?cid=${CLOUD_ID}`,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            method: "POST",
        });
        let dataJSON = await data.json();
        let webhookId = dataJSON.webhookRegistrationResult[0].createdWebhookId;
        let webhookToken = `${CLOUD_ID}${webhookId}`;
        return webhookToken;
    }
    async function getCloudId(URL, ACCESS_TOKEN) {
        let data = await fetch(URL, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            method: "GET",
        });
        console.log(data);
        let dataJSON = await data.json();
        console.log(dataJSON);

        let CLOUD_ID = dataJSON[0].id;
        return CLOUD_ID;
    }
    async function getRefreshAndAccessCode(
        URL,
        client_id,
        client_secret,
        AUTH_CODE,
        redirect_uri
    ) {
        let data = await fetch(URL, {
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: client_id,
                client_secret: client_secret,
                code: AUTH_CODE,
                redirect_uri: redirect_uri,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        let dataJSON = await data.json();
        console.log(dataJSON);

        let REFRESH_TOKEN = dataJSON.refresh_token;
        let ACCESS_TOKEN = dataJSON.access_token;
        return [REFRESH_TOKEN, ACCESS_TOKEN];
    }

    return { getCloudId, getRefreshAndAccessCode, registerWebhoook };
};

export default JiraAuthApi;
