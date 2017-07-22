import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { ProgressBar } from '../ProgressBar';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TOwnProps = RouteComponentProps<{}>;
type TStateProps = {
  routes: TRoute[];
  loaded: boolean;
} & TOwnProps;
type TDispatchProps = {
  reload: () => void;
};
type TProps = TStateProps & TDispatchProps;

class RoutesComponent extends React.Component<TProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { routes, loaded } = this.props;
    if (!loaded) {
      return <ProgressBar mode="query" />;
    }

    const renderRow = (tour: TRoute) => (
      <tr key={tour.id}>
        <td>{tour.name}</td>
        <td className="numeric">{tour.distance}</td>
        <td className="numeric">{tour.elevation}</td>
        <td>{tour.user}</td>
        <td>{new Date(tour.updatedAt).toISOString()}</td>
        <td>{new Date(tour.createdAt).toISOString()}</td>
      </tr>
    );

    return (
      <div >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="numeric">Distance</th>
              <th className="numeric">Elevation</th>
              <th>User</th>
              <th>Last updated</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(renderRow)}
          </tbody>
        </table>
      </div >
    );
  }

  private initialize = (props: TProps) => {
    const { loaded, reload } = props;
    if (!loaded) {
      reload();
    }
  }
}

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  ...ownProps,
  routes: fromReducers.getRoutes(state),
  loaded: fromReducers.areRoutesLoaded(state)
});

export const Routes = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  { reload: fromActions.routes.reload }
)(RoutesComponent);