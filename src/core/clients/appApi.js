const createClient = (baseUrl, api = fetch) => {
  let interceptRequest = (url, options) => {
    return { interceptedUrl: url, interceptedOptions: options };
  };
  let interceptResponse = async (response) => response;
  let interceptError = (error) => error;

  return {
    get: async (url, options = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(url, options);
        let response = await api(baseUrl + interceptedUrl, interceptedOptions);
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        } else throw exception;
      }
    },
    post: async (url, values, options = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(url, options);
        let response = await api(baseUrl + interceptedUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        } else throw exception;
      }
    },
    put: async (url, values, options = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(url, options);
        let response = await api(baseUrl + interceptedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        } else {
          throw exception;
        }
      }
    },
    delete: async (url, options = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(url, options);
        let response = await api(baseUrl + interceptedUrl, {
          method: 'DELETE',
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        } else throw exception;
      }
    },
    registerInterceptors: ({ request, response, responseError }) => {
      if (!!request) interceptRequest = request;
      if (!!response) interceptResponse = response;
      if (!!response) interceptError = responseError;
    },
  };
};

const appApi = createClient('http://localhost:3000', fetch);

appApi.registerInterceptors({
  response: async (response) => {
    if (isInternalServerError(response.status)) {
      window.location.assign('/error/500');
    }
    if (isForbiddenStatus(response.status)) {
      window.location.assign('/error/403');
    }
    if (isBadRequest(response.status)) {
      const exceptionData = await response.json();
      throw exceptionData;
    }
    return response;
  },
  responseError: (error) => {
    window.location.assign('/error/500');
  },
});

const isInternalServerError = (statusCode) => {
  return statusCode === 500;
};

const isForbiddenStatus = (statusCode) => {
  return statusCode === 403;
};

const isBadRequest = (statusCode) => {
  return statusCode === 400;
};

export { appApi };
