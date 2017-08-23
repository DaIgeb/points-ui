import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, RouteComponentProps, withRouter } from 'react-router-dom';

import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';

import { history } from './history';
import { CoreLayout } from './layouts/CoreLayout';
import { Header, Navigation, Tours, People, Routes, PrivateRoute } from './components';
import { Callback } from './auth/Callback';
import configureStore from './store/configureStore';

const handleAuthentication = (nextState: RouteComponentProps<void>) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    // auth.handleAuthentication();
  }
};

const Home = () => (
  <div>
    Home
  </div>
);

class AppComponent extends React.Component<RouteComponentProps<void>, {}> {
  render() {
    return (
      <CoreLayout
        footer={<div>Footer</div>}
        header={<Header />}
        navigation={<Navigation />}
      >
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/routes" component={Routes} />
          <PrivateRoute path="/members" component={People} />
          <PrivateRoute path="/tours" component={Tours} />
          <PrivateRoute
            path="/callback"
            render={(props) => {
              handleAuthentication(props);
              return <Callback />;
            }}
          />
        </Switch>
      </CoreLayout>
    );
  }
}

const App = withRouter<{}>(connect<{}, {}, RouteComponentProps<void>>(() => ({}), {})(AppComponent));

export const makeMainRoutes = () => {
  const store = configureStore({});

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={createMuiTheme()}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};