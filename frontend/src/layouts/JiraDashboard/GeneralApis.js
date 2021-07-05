require("dotenv").config();

const client_id = process.env.REACT_APP_CLIENT_ID_JIRA;
const client_secret = process.env.REACT_APP_CLIENT_SECRET_JIRA;
const URL = "https://auth.atlassian.com/oauth/token";
const REFRESH_TOKEN = localStorage.getItem("REFRESH_TOKEN");

const GeneralApis = () => {
    async function getIssues(
        url,
        startAt,
        maxResults,
        jql,
        requestedToken = false
    ) {
        let ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
        let details = await fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            method: "POST",
            body: JSON.stringify({
                startAt: startAt,
                maxResults: maxResults,
                fields: ["summary", "priority", "issuetype"],
                jql: jql,
            }),
        });

        if (details.status === 401 && requestedToken == false) {
            let ACCESS_TOKEN = await getAccessToken(
                URL,
                client_id,
                client_secret,
                REFRESH_TOKEN
            );
            let token = await getIssues(url, startAt, maxResults, true);
            return token;
        } else if (details.status >= 400) {
            alert("Enter Valid JQL");
            throw console.error("Error in API call");
        } else {
            let detailsJSON = await details.json();
            return detailsJSON;
        }
    }
    async function getAccessToken(
        URL,
        client_id,
        client_secret,
        REFRESH_TOKEN
    ) {
        let data = await fetch(URL, {
            body: JSON.stringify({
                grant_type: "refresh_token",
                client_id: client_id,
                client_secret: client_secret,
                refresh_token: REFRESH_TOKEN,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        if (data.status < 400) {
            let dataJSON = await data.json();
            let ACCESS_TOKEN = dataJSON.access_token;
            localStorage.setItem("ACCESS_TOKEN", ACCESS_TOKEN);
            return ACCESS_TOKEN;
        } else {
            throw console.error("API is not working");
        }
    }

    return { getIssues };
};

export default GeneralApis;
