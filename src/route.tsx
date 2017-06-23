import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { history } from './history';
import { CoreLayout } from './layouts/CoreLayout';
import { Home } from './Home';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Callback } from './auth/Callback';
// import * as auth from './auth/Auth';
import configureStore from './store/configureStore';

const handleAuthentication = (nextState: RouteComponentProps<void>) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    // auth.handleAuthentication();
  }
};

class AppComponent extends React.Component<{}, {}> {

  render() {
    return (
      <CoreLayout
        footer={<div>Footer</div>}
        header={<Header />}
        navigation={<Navigation />}
      >
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/members" component={Home} />
          <Route path="/tours" component={Home} />
          <Route
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

const App = connect(() => ({}), {})(AppComponent);

export const makeMainRoutes = () => {
  const store = configureStore({});

  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider >
  );
};