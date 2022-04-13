import { useState, useCallback } from "react";

/* 

useHttp

This hook is used to make API calls, it returns 'loading', 'data', 'error' 
and 'sendRequest' which can then be used in components.


'loading'       - hooks sets this state to true when it begins the request
                  and sets it back to false once it's done. Can also be
                  initially true with 'startWithLoading' parameter

'data'          - actual data that arrives from the request once the request
                  is over

'error'         - error received from the server we're sending the request to

'sendRequest'   - call with 'requestConfig' param passed to make the API call

*/

const useHttp = (startWithLoading = false) => {
  const [loading, setLoading] = useState(startWithLoading);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = useCallback(async (requestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(requestConfig.url, {
        // 'requestConfig'  - {url, method, headers, body} (body doesn't need to be in JSON)
        headers: requestConfig.headers || {},
        method: requestConfig.method || "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(`${data.status_message} (${data.status_code})`);

      setData(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  }, []);

  return { data, loading, error, sendRequest };
};

export default useHttp;
