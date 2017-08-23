import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { ProgressBar } from '../ProgressBar';
import { PrivateRoute } from '../PrivateRoute';
import { Add } from './Add';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TOwnProps = RouteComponentProps<{}>;
type TStateProps = {
  tours: TTour[];
  loaded: boolean;
};
type TDispatchProps = {
  reload: () => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

// const styles = require<{ 'table-header-cell': string, numeric: string }>('./Tours.css');

class ToursComponent extends React.Component<TProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { tours, loaded } = this.props;
    if (!loaded) {
      return <ProgressBar mode="indeterminate" />;
    }

    const renderRow = (tour: TTour) => (
      <tr key={tour.id}>
        <td>{tour.route}</td>
        <td className="numeric">{tour.points}</td>
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
              <th>Route</th>
              <th className="numeric">Points</th>
              <td>User</td>
              <td>Last updated</td>
              <td>Created at</td>
            </tr>
          </thead>
          <tbody>
            {tours.map(renderRow)}
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
  tours: fromReducers.getTours(state),
  loaded: fromReducers.areToursLoaded(state)
});

const ToursInt = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  { reload: fromActions.tours.reload }
)(ToursComponent);

export const Tours = () => (
  <div>
    <PrivateRoute path="/tours/add" component={Add} exact={true} />
    <PrivateRoute path="/tours" component={ToursInt} exact={false} />
  </div>
);