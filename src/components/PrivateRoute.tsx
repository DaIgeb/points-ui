import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps, Route, withRouter, RouteComponentProps } from 'react-router-dom';

import * as fromReducers from '../reducers';

type TOwnProps = RouteProps & { roles?: string[] };
type TStateProps = {
  user: TProfile | undefined
};
type TDispatchProps = {};
type TProps = TOwnProps & TStateProps & TDispatchProps & RouteComponentProps<{}>;
const mapStateToProps = (state: TState, ownProps: TOwnProps & RouteComponentProps<{}>) => ({
  ...ownProps,
  user: fromReducers.getProfile(state)
});

const PrivateRouteComponent = connect(mapStateToProps, {})((props: TProps) => {
  const { roles, user, component, render, ...rest } = props;
  if (user) {
    const { roles: userRoles } = user;
    if (!roles || userRoles && !roles.some(r => userRoles.indexOf(r) === -1)) {
      return <Route {...rest} component={component} render={render} />;
    }

    return <Route {...rest} render={() => <p>User is missing the following roles: {roles.join()}</p>} />;
  }

  return <Route {...rest} render={() => <p>Please login</p>} />;

});

export const PrivateRoute = withRouter<TOwnProps>(PrivateRouteComponent);
