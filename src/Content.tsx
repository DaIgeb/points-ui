import * as React from 'react';

// import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import { user } from './auth/authenticate';

// import { Login } from './Login';

type TProps = {};
type TState = { id_token: string | null; attr: string; };
/*
const Session = () => {
  const currentUser = user();
  if (!currentUser) {
    return null;
  }
  const session = currentUser ? currentUser.getSignInUserSession() : null;
  if (!session) {
    return null;
  }
  if (!session.isValid()) {
    return null;
  }

  const idToken = session.getIdToken();
  const accessToken = session.getAccessToken();
  const refreshToken = session.getRefreshToken();

  return (
    <div>
      <p>{session.isValid() ? 'Logged in' : 'invalid'}</p>
      <p>{new Date().toISOString()}</p>
      <p>ID: {new Date(idToken.getExpiration() * 1000).toISOString()}</p>
      <p>Access: {new Date(accessToken.getExpiration() * 1000).toISOString()}</p>
      <p>{refreshToken && refreshToken.getToken()}</p>
      {
        refreshToken &&
        refreshToken.getExpiration &&
        <p>Refresh: {new Date(refreshToken.getExpiration() * 1000).toISOString()}</p>
      }
    </div>
  );

  return null;
};
*/
export class App extends React.Component<TProps, TState> {
  // private interval: number;

  // tslint:disable-next-line:no-any
  constructor(props: TProps, context: any) {
    super(props, context);

    this.state = { id_token: '', attr: '' };
  }

  render() {
    /*const currentUser = user();
    const session = currentUser ? currentUser.getSignInUserSession() : null;
    if (this.interval && (!session || !session.isValid())) {
      window.clearInterval(this.interval);
    }

    return (
      <MuiThemeProvider>
        <div>
          <Session />
          {
            currentUser && session && session.isValid() ?
              <p>{currentUser.getUsername()}</p> :
              <Login onLogin={this.onLogin} />
          }
        </div>
      </MuiThemeProvider>
    );*/
    return null;
  }

  // tslint:disable-next-line:no-any
  /*private onLogin = () => {
    const currentUser = user();
    if (currentUser) {
      const session = currentUser.getSignInUserSession();
      if (session) {
        this.setState({ id_token: session.getIdToken().getJwtToken() });
      }

      this.interval = window.setInterval(() => this.setState({ ...this.state }), 1000);
      currentUser.getUserAttributes((error: Error, attributes: CognitoUserAttribute[]) => {
        if (attributes) {
          this.setState({ attr: attributes.map((attr) => attr.toString()).join() });
        }
      });
    }
  }*/
}
