import { TIMEOUT_SECS } from "./config";

export const timeout = function (secs) {
  return new Promise(function (_, reject) {
    setTimeout(
      () =>
        reject(
          new Error(`Request took too long! Timout after ${secs} seconds`)
        ),
      secs * 1000
    );
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  const fetchPromise = uploadData
    ? fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);

  const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECS)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};
