import * as React from 'react';
import { connect } from 'react-redux';
import { Auth0UserProfile } from 'auth0-js';

import { IconLabel, FontIcon } from '../';
import { login, logout } from '../../actions';
import * as fromReducers from '../../reducers';

const styles = require<TStyle>('./Header.css');
const logo = require<string>('./logo.svg');

type TStyle = { header: string; };
type TStateProps = {
  profile: Auth0UserProfile | undefined
};
type TDispatchProps = {
  login: () => void;
  logout: () => void;
};
type TProps = TStateProps & TDispatchProps;

class HeaderComponent extends React.Component<TProps, {}> {
  render() {
    const { profile, login: doLogin, logout: doLogout } = this.props;
    const userContent = profile ?
      <img src={profile.picture} alt="profile" />
      : <FontIcon size="md-48" iconName="account_circle" />;

    return (
      <div className={styles.header}>
        <div className="title">
          <IconLabel iconName="menu" size="md-24" label="RV Stadt-Winterthur Punkteliste" />
        </div>
        <div className="filler" />
        <div className="user" onClick={profile ? doLogout : doLogin}>
          {userContent}
        </div>
        <div className="logo">
          <img src={logo} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState): TStateProps => ({
  profile: fromReducers.getProfile(state)
});

export const Header = connect<TStateProps, TDispatchProps, {}>(mapStateToProps, { login, logout })(HeaderComponent);