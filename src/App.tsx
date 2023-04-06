import './App.css';
import AppTheme from './context/theme';
import Main from './views/Main';
import DrawerProvider from './context/drawer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import InternalServerError from './views/Errors/InternalServerError';
import Forbidden from './views/Errors/Forbidden';
import { IntlProvider } from 'react-intl';
import errorMessages from './lang/pl_PL.json';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <IntlProvider messages={errorMessages} locale="pl" defaultLocale="pl">
          <AppTheme>
            <DrawerProvider>
              <Routes>
                <Route path="/*" element={<Main />} />
                <Route path="/error/500" element={<InternalServerError />} />
                <Route path="/error/403" element={<Forbidden />} />
              </Routes>
            </DrawerProvider>
          </AppTheme>
        </IntlProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
