const employeeModel = require("../model/employeeModel");
const url_refresh_token = "https://auth.atlassian.com/oauth/token";
const url_cloud_id =
  "https://api.atlassian.com/oauth/token/accessible-resources";
const url_access_token = "https://auth.atlassian.com/oauth/token";
const fetch = require("node-fetch");
require("dotenv").config();

async function setupJira(req, res) {
  const auth_code = req.body.auth_code;
  const email = req.email;

  try {
    const employee = await employeeModel.findOne({
      email: email,
    });
    if (!employee) {
      throw new Error("can't get employee");
    }
    if (auth_code && email) {
      let data = await fetch(url_refresh_token, {
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: process.env.JIRA_CLIENT_ID,
          client_secret: process.env.JIRA_CLIENT_SECRET,
          code: auth_code,
          redirect_uri: process.env.JIRA_REDIRECT_URL,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (data.status >= 400) {
        throw new Error("Can't get refresh token");
      }
      let dataJSON = await data.json();
      let REFRESH_TOKEN = dataJSON.refresh_token;
      let ACCESS_TOKEN = dataJSON.access_token;

      let cloudData = await fetch(url_cloud_id, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        method: "GET",
      });
      if (cloudData.status >= 400) {
        throw new Error("can't get cloud id");
      }
      let cloudDataJSON = await cloudData.json();
      let CLOUD_ID = cloudDataJSON[0].id;
      await getBaseUrl(CLOUD_ID, email);
      // await registerWebhoook(CLOUD_ID, ACCESS_TOKEN, email);

      employee.refreshToken = REFRESH_TOKEN;
      employee.cloudId = CLOUD_ID;
      employee.doneJiraAuth = true;

      await employee.save();
      res.json({
        status: "Success",
      });
    } else {
      throw new Error("can't get AuthCode or email");
    }
  } catch (err) {
    res.json({
      status: "Failed",
      error: err.message,
    });
  }
}

async function getAccessToken(REFRESH_TOKEN) {
  try {
    let data = await fetch(url_access_token, {
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: process.env.JIRA_CLIENT_ID,
        client_secret: process.env.JIRA_CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (data.status >= 400) {
      throw new Error();
    }
    let dataJSON = await data.json();
    let ACCESS_TOKEN = dataJSON.access_token;
    return ACCESS_TOKEN;
  } catch {
    return -1;
  }
}
async function registerWebhoook(CLOUD_ID, ACCESS_TOKEN, email) {
  const URL = `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/2/webhook`;

  try {
    let data = await fetch(URL, {
      body: JSON.stringify({
        webhooks: [
          {
            jqlFilter: "project != DEMO OR project = DEMO",
            events: ["jira:issue_created", "jira:issue_updated"],
          },
        ],
        url: `${process.env.JIRA_WEBHOOK_URL}?cid=${CLOUD_ID}`,
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
    const employee = await employeeModel.findOne({
      email: email,
    });
    if (!employee) {
      throw new Error("can't get employee");
    }

    employee.jiraWebhookToken = webhookToken;
    await employee.save();
    res.json({
      status: "Success",
    });
  } catch (err) {
    throw new Error(err.message);
  }
}
async function webhookToken(req, res) {
  const email = req.email;
  try {
    const employee = await employeeModel.findOne({
      email: email,
    });
    if (!employee) {
      throw new Error("can't get employee");
    }
    const webhookId = employee.jiraWebhookToken;
    res.json({
      status: "Success",
      webhookId: webhookId,
    });
  } catch (err) {
    res.json({
      status: "Failed",
      message: err.message,
    });
  }
}
async function getDataByJql(req, res) {
  try {
    const { startAt, maxResults, jql } = req.body;
    const email = req.email;
    const employee = await employeeModel.findOne({
      email: email,
    });
    const jiraBaseUrl = employee.jiraBaseUrl;
    if (!employee) {
      throw new Error("Can't get Employee");
    }
    const REFRESH_TOKEN = employee.refreshToken;
    const CLOUD_ID = employee.cloudId;
    const ACCESS_TOKEN = await getAccessToken(REFRESH_TOKEN);
    if (ACCESS_TOKEN === -1) {
      throw new Error("Can't get Access token");
    }
    const url_data_jql = `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/search`;
    let data = await fetch(url_data_jql, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify({
        startAt: startAt,
        maxResults: maxResults,
        fields: ["summary", "priority", "issuetype", "status"],
        jql: jql,
      }),
    });
    if (data.status >= 400) {
      throw new Error("Can't Get Data From Jira");
    }
    let dataJSON = await data.json();
    res.json({
      status: "Success",
      data: dataJSON,
      jiraBaseUrl: jiraBaseUrl,
    });
  } catch (err) {
    // console.log(err.message);
    res.json({
      status: "Failed",
      error: err.message,
    });
  }
}

async function authenticated(req, res) {
  try {
    const email = req.email;
    const employee = await employeeModel.findOne({
      email: email,
    });

    if (!employee) {
      throw new Error("Error in verify Authentication");
    }
    const doneJiraAuth = employee.doneJiraAuth;
    // console.log("chk", done_jira_authentication);
    res.json({
      status: "Success",
      done_jira_authentication: doneJiraAuth,
    });
  } catch (err) {
    res.json({
      status: "Failed",
      error: err.message,
    });
  }
}

async function getFilters(req, res) {
  const email = req.email;
  try {
    const employee = await employeeModel.findOne({
      email: email,
    });
    if (!employee) {
      throw new Error("Can't get Employee");
    }
    const REFRESH_TOKEN = employee.refreshToken;
    const CLOUD_ID = employee.cloudId;
    const ACCESS_TOKEN = await getAccessToken(REFRESH_TOKEN);
    if (ACCESS_TOKEN === -1) {
      throw new Error("Can't get Access token");
    }
    const url_data_filter = `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/filter/my`;
    let data = await fetch(url_data_filter, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      method: "GET",
    });
    if (data.status >= 400) {
      throw new Error("Can't Get Data From Jira");
    }
    let dataJSON = await data.json();
    res.json({
      status: "Success",
      data: dataJSON,
    });
  } catch (err) {
    res.json({
      status: "Failed",
      error: err.message,
    });
  }
}
async function getBaseUrl(CLOUD_ID, email) {
  const URL = `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/serverInfo`;

  const employee = await employeeModel.findOne({
    email: email,
  });
  if (!employee) {
    throw new Error("Error in verify Authentication");
  }
  let data = await fetch(URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  let dataJSON = await data.json();

  if (data.status >= 400) {
    throw new Error();
  }

  employee.jiraBaseUrl = dataJSON.baseUrl;
  await employee.save();
}

module.exports.setupJira = setupJira;
module.exports.getDataByJql = getDataByJql;
module.exports.authenticated = authenticated;
module.exports.webhookToken = webhookToken;
module.exports.getFilters = getFilters;
