import { Auth0UserProfile } from 'auth0-js';
import * as React from 'react';
// import * as request from 'superagent';

import { getProfile, getUser } from '../auth/Auth';

type TState = {
  profile: Auth0UserProfile | undefined;
  error: undefined;
  users: object | undefined;
};

export class Profile extends React.Component<{}, TState> {
  // tslint:disable-next-line
  constructor(props: {}, context: any) {
    super(props, context);

    this.state = { profile: undefined, error: undefined, users: {} };
  }
  componentWillMount() {
    getProfile((err, profile) => {
      this.setState({ profile });
    });
    getUser((error, token) => {
      this.setState({ users: token });
    });
  }
  render() {
    const { profile, error, users } = this.state;

    if (!profile) {
      return null;
    }

    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <div>
            <img src={profile.picture} alt="profile" />
            <div>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {users && <pre>{JSON.stringify(users, null, 2)}</pre>}
          </div>
        </div>
      </div>
    );
  }
}
