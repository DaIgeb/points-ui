/*import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { userPool } from './config';

let cognitoUser: CognitoUser | null = null;

export const user = () => cognitoUser;

export const login = (
  username: string,
  password: string,
  callback: (err: Object, success: string) => void) => {
  getIdToken(username, password, callback);
};

export const getIdToken = (
  username: string,
  password: string,
  callback: (err: Object | null, success: string | null) => void
) => {
  const authenticationData = {
    Username: username,
    Password: password,
    Pool: userPool
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);
  cognitoUser = new CognitoUser(authenticationData);
  const authenticationResult = cognitoUser.getSignInUserSession();
  if (!authenticationResult || !authenticationResult.isValid()) {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result: CognitoUserSession) {
        if (result.isValid()) {
          callback(null, result.getIdToken().getJwtToken());
        } else {
          callback('Invalid response', null);
        }
      },

      onFailure: function (err: Object) {
        console.error(err);
        callback(err, null);
      },
    });
  } else {
    callback(null, authenticationResult.getIdToken().getJwtToken());
  }
};
*/