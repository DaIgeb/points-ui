import * as React from 'react';
import { connect } from 'react-redux';
import { Auth0UserProfile } from 'auth0-js';

import { IconLabel } from '../components';
import { FontIcon } from '../components';
import { login, logout } from '../actions';

const styles = require<TStyle>('./Header.css');
const logo = require<string>('./logo.svg');

type TStyle = { header: string };
type TProps = {
  profile: Auth0UserProfile | null,
  login: () => void;
  logout: () => void;
};
class HeaderComponent extends React.Component<TProps, {}> {
  render() {
    const { profile, login, logout } = this.props;
    const userContent = profile ?
      <img src={profile.picture} alt="profile" />
      : <FontIcon size="md-48" iconName="account_circle" />;

    return (
      <div className={styles.header}>
        <div className="title">
          <IconLabel iconName="menu" size="md-24" label="RV Stadt-Winterthur Punkteliste" />
        </div>
        <div className="filler" />
        <div className="user" onClick={profile ? logout : login}>
          {userContent}
        </div>
        <div className="logo">
          <img src={logo} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => ({
  profile: state.auth
});

export const Header = connect(mapStateToProps, { login, logout })(HeaderComponent);