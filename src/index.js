import axios from "axios";

const IS_NETWORK_REQUEST_LOGGING_ENABLED =
  process.env.K_NETWORK_CLIENT_IS_REQUEST_LOGGING;
const IS_NETWORK_RESPONSE_LOGGING_ENABLED =
  process.env.K_NETWORK_CLIENT_IS_REQUEST_LOGGING;
const IS_NETWORK_ERROR_LOGGING_ENABLED =
  process.env.K_NETWORK_CLIENT_IS_REQUEST_LOGGING;

const postJson = async (url, body, reqHeaders, log = true) => {
  if (IS_NETWORK_REQUEST_LOGGING_ENABLED && log) {
    console.log(JSON.stringify({ url, body, reqHeaders }));
  }

  try {
    const { data, status, statusText, headers, config, request } =
      await axios.post(url, body, {
        headers: reqHeaders,
      });
    if (IS_NETWORK_RESPONSE_LOGGING_ENABLED && log) {
      console.log(
        JSON.stringify({
          LOG_TYPE: "NETWORK RESPONSE",
          STATUS: status,
          STATUS_TEXT: statusText,
          RESPONSE_DATA: data,
        })
      );
    }
    return { success: true, response: data, error: false };
  } catch (ex) {
    const { data, status, statusText, headers, config, request, message } = ex;
    if (IS_NETWORK_ERROR_LOGGING_ENABLED && log) {
      console.log(
        JSON.stringify({
          LOG_TYPE: "NETWORK ERROR",
          STATUS: status,
          STATUS_TEXT: statusText,
          MESSAGE: message,
          RESPONSE_DATA: data,
        })
      );
    }
    return { success: false, response: data, error: true };
  }
};

export default {
  postJson,
};
