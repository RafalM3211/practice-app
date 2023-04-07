import { appApi } from './appApi';
import { posts as exampleReturnedData } from '../../test/fixures.json';
import { server } from '../../test/server';
import { rest } from 'msw';
import { useProvider } from 'test-data-provider';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface HttpMethodProviderEntry {
  method: HttpMethod;
  url: string;
  expectedOkResponseCode: number;
}

const httpMethodsProvider: HttpMethodProviderEntry[] = [
  {
    method: 'GET',
    url: '/posts',
    expectedOkResponseCode: 200,
  },
  {
    method: 'POST',
    url: '/posts',
    expectedOkResponseCode: 201,
  },
  {
    method: 'PUT',
    url: '/posts/2',
    expectedOkResponseCode: 201,
  },
  {
    method: 'DELETE',
    url: '/posts/2',
    expectedOkResponseCode: 204,
  },
];

const toLowerCase = <input extends string>(string: input) => {
  return string.toLowerCase() as Lowercase<input>;
};

const mockHandler = (method: HttpMethod, url: string, status: number, data: object) => {
  server.use(
    rest[toLowerCase(method)]('http://localhost:3000' + url, (req, res, ctx) => {
      return res.once(ctx.status(status), ctx.json(data));
    }),
  );
};

describe('errors intercepting', () => {
  useProvider(httpMethodsProvider, ({ method, url }) => {
    it(`redirects to internal server error page on 500 response status code fetched with ${method}`, async () => {
      // arrange
      mockHandler(method, url, 500, {});

      // act
      await appApi[toLowerCase(method)](url, {});

      // assert
      expect(window.location.assign).toHaveBeenCalledWith('/error/500');
    });

    it(`redirects to forbidden page on 403 response status code fetched with ${method}`, async () => {
      // arrange
      mockHandler(method, url, 403, {});

      // act
      await appApi[toLowerCase(method)](url, {});

      // assert
      expect(window.location.assign).toHaveBeenCalledWith('/error/403');
    });

    it(`throws expected exception on bad ${method} request`, async () => {
      // arrange
      const expectedErrorData = { errorMessage: 'expected error message' };
      mockHandler(method, url, 400, expectedErrorData);

      // act
      const asd = appApi[toLowerCase(method)](url, {});

      // assert
      await expect(asd).rejects.toEqual(expectedErrorData);
    });
  });
});

describe('OK responses', () => {
  useProvider(httpMethodsProvider, ({ method, url, expectedOkResponseCode }) => {
    it(`returns with expected response code on ${method} request`, async () => {
      // arrange

      // act
      const response = await appApi[toLowerCase(method)](url, {});
      const responseCode = response && response.status;

      // assert
      expect(responseCode).toBe(expectedOkResponseCode);
    });

    it(`returns correct data on ${method} request`, async () => {
      // arrange
      mockHandler(method, url, expectedOkResponseCode, exampleReturnedData);

      // act
      const response = await appApi[toLowerCase(method)](url, {});
      const responseData = response && (await response.json());

      // assert
      expect(responseData).toStrictEqual(exampleReturnedData);
    });
  });
});
