import * as React from 'react';
import { } from 'react-router-dom';
import { history } from '../history';

import RaisedButton from 'material-ui/RaisedButton';

import { isAuthenticated, login, logout } from './Auth';

export class Login extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <RaisedButton
          label="Home"
          onTouchTap={() => this.goTo('home')}
        />
        {
          !isAuthenticated() && (
            <RaisedButton
              label="Log In"
              onTouchTap={login}
            />
          )
        }
        {
          isAuthenticated() && (
            <RaisedButton
              label="Log Out"
              onTouchTap={logout}
            />
          )
        }
      </div >
    );
  }

  private goTo = (route: string) => {
    history.replace(`/${route}`);
  }
}
