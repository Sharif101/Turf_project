const api = "";

export const useRequest = () => {
  // handle get request
  const handleFetch = async (endPoint, token) => {
    let data = [];
    let isSuccess = false;
    let isLoading = true;

    try {
      const response = await fetch(api + endPoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        isSuccess = true;
        isLoading = false;
        return { data, isSuccess, isLoading };
      }
    } catch (e) {
      return { data, isSuccess, isLoading };
    }
  };

  // handle post(default), patch and put request
  const handleSubmit = async (endPoint, body, token, method = "POST") => {
    let log = [];
    let isSuccess = false;
    let isError = false;

    try {
      const response = await fetch(api + endPoint, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const log = await response.json();

      if (response.ok) {
        isSuccess = true;
        return { log, isSuccess, isError };
      } else {
        isError = log.context;
        return { log, isSuccess, isError };
      }
    } catch (e) {
      isError = e;
      return { log, isSuccess, isError };
    }
  };

  // handle delete request
  const handleDelete = async (endPoint, token) => {
    let log = [];
    let isSuccess = false;
    let isError = false;

    try {
      const response = await fetch(api + endPoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const log = await response.json();

      if (response.ok) {
        isSuccess = true;
        return { log, isSuccess, isError };
      } else {
        isError = log.context;
        return { log, isSuccess, isError };
      }
    } catch (e) {
      isError = e;
      return { log, isSuccess, isError };
    }
  };

  return { handleFetch, handleSubmit, handleDelete };
};
