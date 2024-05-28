import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  // useHistory,
  Switch,
} from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import 'antd/dist/antd.less';
import { NotFoundPage } from './components/pages/NotFound';
import { LandingPage } from './components/pages/Landing';
import LoadingPage from './components/common/LoadingPage';

import { FooterContent, SubFooter } from './components/Layout/Footer';
import { HeaderContent } from './components/Layout/Header';

// import { TablePage } from './components/pages/Table';

import { Layout } from 'antd';
import GraphsContainer from './components/pages/DataVisualizations/GraphsContainer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './state/reducers';
import { colors } from './styles/data_vis_colors';
import ProfilePage from './components/pages/Profile/ProfilePage';

const { primary_accent_color } = colors;

const domain = process.env.REACT_APP_AUTH0_DOMAIN || 'dev-kr11gpui1uacisyb.us.auth0.com';
const clientId = process.env.EACT_APP_AUTH0_CLIENT_ID ||"OWC8hS47xjpOg2Ibjjf3uuJXCKPQh8hu";

const store = configureStore({ reducer: reducer });
ReactDOM.render(
  <Router>
    <Provider store={store}>
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
      }}
      >
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Auth0Provider>
    </Provider>
  </Router>,
  document.getElementById('root')
);

export function App() {
  const { Footer, Header } = Layout;
  const { isLoading, error } = useAuth0();

  return (
    <Layout>
      <Header
        style={{
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: primary_accent_color,
        }}
      >
        <HeaderContent />
      </Header>
      {error && <div>Oops... {error.message}</div>}{' '}
      {!error && isLoading && <LoadingPage />}
      {!error && !isLoading && (
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/graphs" component={GraphsContainer} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
      )}
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          color: '#E2F0F7',
        }}
      >
        <FooterContent />
      </Footer>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          padding: 0,
        }}
      >
        <SubFooter />
      </Footer>
    </Layout>
  );
}
