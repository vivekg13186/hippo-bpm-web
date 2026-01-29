import axios from "axios";
import https from "https";

function axiosErrorResponse(error) {
  console.error(error);
  if (error.response) {
    return {
      message: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
    };
  } else if (error.request) {
    return {
      message: "error in request check log",
    };
  } else {
    return {
      message: error.message,
    };
  }
  return {
    message: error.config,
  };
}

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

function getAxiosConfig(account) {
  if (account.type === "zen") {
    const base = `${account.username}:${account.password}`;
    const code = Buffer.from(base).toString("base64");

    return {
      httpsAgent,
      headers: {
        Authorization: `ZenApiKey ${code}`,
        Accept: "application/json",
      },
    };
  }

  return {
    httpsAgent,
    auth: {
      username: account.username,
      password: account.password,
    },
    headers: {
      Accept: "application/json",
    },
  };
}
export async function getToolkits(account) {
  const config = getAxiosConfig(account);

  const url = `${account.url}/rest/bpm/wle/v1/toolkit`;

  const response = await axios.get(url, config);
  return response.data;
}
export async function getInstance(account, instanceId) {
  const config = getAxiosConfig(account);
  const url = `${account.url}/rest/bpm/wle/v1/process/${instanceId}`;

  const response = await axios.get(url, {
    ...config,
    params: {
      parts: "all",
    },
  });
  return response.data;
}

export async function executeService(account, testServiceModel) {
  const config = getAxiosConfig(account);

  const payload = {
    action: "start",
    createTask: "false",
    parts: "all",
    params: testServiceModel.input,
  };

  try {
    const response = await axios.post(
      `${account.url}/rest/bpm/wle/v1/service/${testServiceModel.appName}@${testServiceModel.serviceName}`,
      null,
      {
        ...config,
        params: payload,
      },
    );

    return response.data;
  } catch (e) {
    return axiosErrorResponse(e);
  }
}
export async function getSnapshotInfo(account, snapshotId) {
  const config = getAxiosConfig(account);

  const response = await axios.get(
    `${account.url}/rest/bpm/wle/v1/processAppSettings`,
    {
      ...config,
      params: {
        snapshotId: snapshotId,
        recurse: "true",
      },
    },
  );

  return response.data;
}
export async function getApps(account) {
  const config = getAxiosConfig(account);

  const response = await axios.get(
    `${account.url}/rest/bpm/wle/v1/processApps`,
    config,
  );

  return response.data;
}
