import { useCallback, useState } from "react";

export const useHttpClient = () => {
  const [message, setMessage] = useState();
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const responseData = await response.json();
        setMessage(responseData.message);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (err) {
        throw err;
      }
    },
    []
  );
  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }
  return { sendRequest, message };
};
