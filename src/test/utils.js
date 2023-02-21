import { MemoryRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient, setLogger } from 'react-query';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import AppTheme from '../context/theme/theme';
import SnackbarProvider from '../context/snackbar';
import DrawerProvider from '../context/drawer.js';
import errorMessages from '../lang/pl_PL.json';

setLogger({
  // eslint-disable-next-line no-console
  log: console.log,
  // eslint-disable-next-line no-console
  warn: console.warn,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
});

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
};

export const renderWithProviders = (element, options) => {
  render(
    <Router initialEntries={options?.initialEntries}>
      <QueryClientProvider client={createQueryClient()}>
        <IntlProvider messages={errorMessages} locale="pl" defaultLocale="pl">
          <AppTheme>
            <DrawerProvider>
              <SnackbarProvider>{element}</SnackbarProvider>
            </DrawerProvider>
          </AppTheme>
        </IntlProvider>
      </QueryClientProvider>
    </Router>,
  );
};
