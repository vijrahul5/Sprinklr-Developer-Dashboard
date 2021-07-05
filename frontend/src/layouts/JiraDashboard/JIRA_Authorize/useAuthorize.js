import { useState } from "react";
import AuthApis from "./JiraAuthApi";
import { useHistory } from "react-router-dom";

const useAuthorize = () => {
    const history = useHistory();
    const [doneAuthentication, setDoneAuthentication] = useState(
        isAuthenticated()
    );

    const { getCloudId, getRefreshAndAccessCode, registerWebhoook } =
        AuthApis();

    function isAuthenticated() {
        if (localStorage.getItem("CLOUD_ID") !== null) return true;
        return false;
    }

    function goToHome() {
        history.replace("/dashboard");
        window.location.href = "http://localhost:3000/dashboard";
    }
    function showAuthPage(URL) {
        window.location.href = URL;
    }
    function getAuthCode() {
        let len = window.location.href.length;
        let AUTH_CODE = window.location.href.slice(37, len - 12);
        console.log(AUTH_CODE);
        return AUTH_CODE;
    }
    async function getTokens() {
        let AUTH_CODE = getAuthCode();
        let client_id = localStorage.getItem("CLIENT_ID");
        let client_secret = localStorage.getItem("CLIENT_SECRET");
        console.log(client_id, client_secret, AUTH_CODE);
        let [REFRESH_TOKEN, ACCESS_TOKEN] = await getRefreshAndAccessCode(
            "https://auth.atlassian.com/oauth/token",
            client_id,
            client_secret,
            AUTH_CODE,
            "http://localhost:3000/dashboard"
        );

        let CLOUD_ID = await getCloudId(
            "https://api.atlassian.com/oauth/token/accessible-resources",
            ACCESS_TOKEN
        );
        // let webhookId = await registerWebhoook(
        //     `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/2/webhook`,
        //     ACCESS_TOKEN,
        //     CLOUD_ID
        // );

        // localStorage.setItem("WEBHOOK", webhookId);
        saveTokens(AUTH_CODE, REFRESH_TOKEN, CLOUD_ID, ACCESS_TOKEN);
        goToHome();
        setDoneAuthentication(true);
    }
    function saveTokens(AUTH_CODE, REFRESH_TOKEN, CLOUD_ID, ACCESS_TOKEN) {
        localStorage.setItem("AUTH_CODE", AUTH_CODE);
        localStorage.setItem("REFRESH_TOKEN", REFRESH_TOKEN);
        localStorage.setItem("CLOUD_ID", CLOUD_ID);
        localStorage.setItem("ACCESS_TOKEN", ACCESS_TOKEN);
    }
    return { showAuthPage, getTokens, doneAuthentication, goToHome };
};

export default useAuthorize;
