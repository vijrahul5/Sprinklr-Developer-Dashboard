const employeeModel = require("../model/employeeModel");
const urlRefreshToken = "https://auth.atlassian.com/oauth/token";
const urlCloudId = "https://api.atlassian.com/oauth/token/accessible-resources";
const urlAccessToken = "https://auth.atlassian.com/oauth/token";
const fetch = require("node-fetch");
require("dotenv").config();

async function setupJira(req, res) {
  const authCode = req.body.authCode;
  const email = req.email;

  try {
    const employee = await employeeModel.findOne({
      email: email,
    });
    if (!employee) {
      throw new Error("can't get employee");
    }
    if (authCode && email) {
      let data = await fetch(urlRefreshToken, {
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: process.env.JIRA_CLIENT_ID,
          client_secret: process.env.JIRA_CLIENT_SECRET,
          code: authCode,
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
      let dataJson = await data.json();
      let refreshToken = dataJson.refresh_token;
      let accessToken = dataJson.access_token;

      let cloudData = await fetch(urlCloudId, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });
      if (cloudData.status >= 400) {
        throw new Error("can't get cloud id");
      }
      let cloudDataJson = await cloudData.json();
      let cloudId = cloudDataJson[0].id;
      await getBaseUrl(cloudId, email);

      employee.refreshToken = refreshToken;
      employee.cloudId = cloudId;
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
async function getAccessToken(refreshToken) {
  try {
    let data = await fetch(urlAccessToken, {
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: process.env.JIRA_CLIENT_ID,
        client_secret: process.env.JIRA_CLIENT_SECRET,
        refresh_token: refreshToken,
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
    let dataJson = await data.json();
    let accessToken = dataJson.access_token;
    return accessToken;
  } catch {
    return -1;
  }
}
async function registerWebhoook(cloudId, accessToken, email) {
  const url = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/2/webhook`;

  try {
    let data = await fetch(url, {
      body: JSON.stringify({
        webhooks: [
          {
            jqlFilter: "project != DEMO OR project = DEMO",
            events: ["jira:issue_created", "jira:issue_updated"],
          },
        ],
        url: `${process.env.JIRA_WEBHOOK_URL}?cid=${cloudId}`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
    });
    let dataJson = await data.json();
    let webhookId = dataJson.webhookRegistrationResult[0].createdWebhookId;
    let webhookToken = `${cloudId}${webhookId}`;
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
      throw new Error("Server Error : Please Try again");
    }
    const refreshToken = employee.refreshToken;
    const cloudId = employee.cloudId;
    const accessToken = await getAccessToken(refreshToken);
    if (accessToken === -1) {
      throw new Error("Server Error : Please Try again");
    }
    const urlDataJql = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/search`;
    let data = await fetch(urlDataJql, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({
        startAt: startAt,
        maxResults: maxResults,
        fields: ["summary", "priority", "issuetype", "status"],
        jql: jql,
      }),
    });
    if (data.status === 400) {
      throw new Error("Enter Valid Jql Query");
    } else if (data.status >= 400) {
      throw new Error("Server Error : Please Try again");
    }
    let dataJson = await data.json();
    res.json({
      status: "Success",
      data: dataJson,
      jiraBaseUrl: jiraBaseUrl,
    });
  } catch (err) {
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
    res.json({
      status: "Success",
      doneJiraAuthentication: doneJiraAuth,
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
    const refreshToken = employee.refreshToken;
    const cloudId = employee.cloudId;
    const accessToken = await getAccessToken(refreshToken);
    if (accessToken === -1) {
      throw new Error("Can't get Access token");
    }
    const urlDataFilter = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/filter/my`;
    let data = await fetch(urlDataFilter, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });
    if (data.status >= 400) {
      throw new Error("Can't Get Data From Jira");
    }
    let dataJson = await data.json();
    res.json({
      status: "Success",
      data: dataJson,
    });
  } catch (err) {
    res.json({
      status: "Failed",
      error: err.message,
    });
  }
}
async function getBaseUrl(cloudId, email) {
  const url = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/serverInfo`;

  const employee = await employeeModel.findOne({
    email: email,
  });
  if (!employee) {
    throw new Error("Error in verify Authentication");
  }
  let data = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  let dataJson = await data.json();

  if (data.status >= 400) {
    throw new Error();
  }

  employee.jiraBaseUrl = dataJson.baseUrl;
  await employee.save();
}

module.exports.setupJira = setupJira;
module.exports.getDataByJql = getDataByJql;
module.exports.authenticated = authenticated;
module.exports.webhookToken = webhookToken;
module.exports.getFilters = getFilters;
