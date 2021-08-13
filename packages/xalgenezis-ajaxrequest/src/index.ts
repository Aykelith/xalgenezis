declare global {
  interface Window {
    ajaxSettings: any;
  }
}

// TODO: Can only parse simple arrays
function serializeObject(root: any, obj: any) {
  const keys = Object.keys(obj);
  let url = "";
  for (let i = 0, length = keys.length; i < length; ++i) {
    if (obj[keys[i]] === null) continue;

    if (typeof obj[keys[i]] === "object") {
      if (Array.isArray(obj[keys[i]]) && obj[keys[i]].length > 0) {
        const key = keys[i];
        const name =
          "&" + root + escape(root ? "[" + keys[i] + "]" : keys[i]) + "[]=";

        for (let j = 0, length2 = obj[key].length; j < length2; ++j) {
          url += name + escape(obj[key][j]);
        }
      } else {
        url += serializeObject(
          root + escape("[" + keys[i] + "]"),
          obj[keys[i]]
        );
      }
    } else {
      url +=
        "&" +
        root +
        escape(root ? "[" + keys[i] + "]" : keys[i]) +
        "=" +
        escape(obj[keys[i]]);
    }
  }
  return url;
}

function request(type: string, url: string, data?: any, options?: any) {
  if (!options) options = {};

  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          console.log(url, xhttp.status, "Data:", xhttp.response);
          resolve(xhttp.response);
        } else {
          console.error("[ajaxutils]", url, xhttp.status, xhttp.response);

          if (
            options.retryStatusCodes &&
            options.retryStatusCodes.includes(xhttp.status) &&
            options._retryTimes < (options.maxRetryTimes || 3)
          ) {
            options._retryTimes = options._retryTimes
              ? options._retryTimes + 1
              : 1;
            return request(type, url, data, options);
          } else {
            reject({
              status: xhttp.status,
              data: xhttp.response,
            });
          }
        }
      }
    };

    xhttp.responseType = "json";

    console.debug(
      `[ajaxutils]Sending request to ${type}:${url} with data:`,
      data
    );

    let sendData;
    if (data) {
      if (type == "GET") {
        xhttp.open(
          type,
          url + "?_=" + Date.now() + serializeObject("", data),
          true
        );
      } else {
        xhttp.open(type, url, true);

        if (options.multipart) {
          // xhttp.setRequestHeader("Content-Type", "multipart/form-data");
          sendData = data;
        } else {
          xhttp.setRequestHeader("Content-Type", "application/json");
          sendData = JSON.stringify(data);
        }
      }
    } else {
      xhttp.open(type, url, true);
    }

    if (window.ajaxSettings && window.ajaxSettings.headers) {
      for (const header in window.ajaxSettings.headers)
        xhttp.setRequestHeader(header, window.ajaxSettings.headers[header]);
    }

    xhttp.send(sendData);
  });
}

export default request;
