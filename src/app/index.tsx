/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// import Notifier from './pages/Notifier';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeConfig from '../styles/theme';
import Routes from './routes';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeConfig>
          <Helmet
            titleTemplate="%s | Ringkas Dashboard"
            defaultTitle="Ringkas Dashboard"
            htmlAttributes={{ lang: i18n.language }}
          >
            <meta
              name="description"
              content="Internal site for related stakeholders in Ringkas ecosystem to operate their day to day business"
            />
          </Helmet>
          <ToastContainer
            position="top-right"
            autoClose={15000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />

          <Routes />
        </ThemeConfig>
      </LocalizationProvider>
    </BrowserRouter>
  );
}
