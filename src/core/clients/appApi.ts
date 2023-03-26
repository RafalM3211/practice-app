const createClient = (baseUrl: string, api = fetch) => {
  let interceptRequest = (url: string, options: object) => {
    return { interceptedUrl: url, interceptedOptions: options };
  };
  let interceptResponse: ResponseInterceptor = async (response: Response) => response;
  let interceptError: ErrorInterceptor = (error: Error) => {};

  return {
    get: async (url: string, options: object = {}) => {
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
    post: async (url: string, values: object, options: object = {}) => {
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
    put: async (url: string, values: object, options: object = {}) => {
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
    delete: async (url: string, options: object = {}) => {
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
    registerInterceptors: ({ request, response, responseError }: RegisterInterceptorsType) => {
      if (!!request) interceptRequest = request;
      if (!!response) interceptResponse = response;
      if (!!responseError) interceptError = responseError;
    },
  };
};

const appApi = createClient('http://localhost:3000', fetch);

appApi.registerInterceptors({
  response: async (response: Response) => {
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
  responseError: (error: Error) => {
    window.location.assign('/error/500');
  },
});

const isInternalServerError = (statusCode: number) => {
  return statusCode === 500;
};

const isForbiddenStatus = (statusCode: number) => {
  return statusCode === 403;
};

const isBadRequest = (statusCode: number) => {
  return statusCode === 400;
};

export { appApi };


type RequestInterceptor = (url: string, options: object)=>{ interceptedUrl: string, interceptedOptions: object };
type ResponseInterceptor = (response: Response) => Promise<Response>;
type ErrorInterceptor = (error: Error) => void;

interface RegisterInterceptorsType {
  request?: RequestInterceptor,
  response?: ResponseInterceptor,
  responseError?: ErrorInterceptor
}