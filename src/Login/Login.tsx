import * as React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// import { login } from '../auth/authenticate';
// import { login } from './auth/Auth';
let username: TextField;
let password: TextField;

export const Login = (props: { onLogin: () => void }) => {
  const onLogin = (event: React.FormEvent<{}>) => {
    event.preventDefault();

    // tslint:disable-next-line:no-any
   /* login(username.getValue(), password.getValue(), (err: any, success: string) => {
      if (!err) {
        props.onLogin();
      }
    });*/
  };

  return (
    <div>
      <form onSubmit={e => onLogin(e)}>
        <TextField floatingLabelText="Username" ref={input => username = input} />
        <TextField floatingLabelText="Password" type="password" ref={input => password = input} />
        <RaisedButton label="Login" type="submit" primary={true} />
      </form>

      <RaisedButton label="Auth0" primary={true} onTouchTap={onLogin} />
    </div>
  );
};