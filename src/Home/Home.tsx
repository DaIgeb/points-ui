import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { isAuthenticated, login } from '../auth/Auth';
import { Profile } from '../Profile';

export class Home extends React.Component<RouteComponentProps<void>, void> {
  render() {
    const authenticated = isAuthenticated();

    return (
      <div className="container">
        {
          authenticated && (
            <div>
              <h4>
                You are logged in!
              </h4>
              <Profile />
            </div>
          )
        }
        {
          !authenticated && (
            <div>
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={login}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
              <div>
                <pre>
                  {JSON.stringify(this.props, null, 2)}
                </pre>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}