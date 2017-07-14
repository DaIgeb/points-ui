import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TOwnProps = RouteComponentProps<{}>;
type TStateProps = {
  tours: TTour[];
  loaded: boolean;
} & TOwnProps;
type TDispatchProps = {
  reload: () => void;
};
type TProps = TStateProps & TDispatchProps;

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
      return <div className="progress-linear" />;
    }

    const renderRow = (tour: TTour) => (
      <tr key={tour.id}>
        <td>{tour.name}</td>
        <td className="numeric">{tour.points}</td>
        <td className="numeric">{tour.distance}</td>
        <td className="numeric">{tour.elevation}</td>
      </tr>
    );

    return (
      <div >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="numeric">Points</th>
              <th className="numeric">Distance</th>
              <th className="numeric">Elevation</th>
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
  ...ownProps,
  tours: fromReducers.getTours(state),
  loaded: fromReducers.areToursLoaded(state)
});

export const Tours = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  { reload: fromActions.tours.reload }
)(ToursComponent);