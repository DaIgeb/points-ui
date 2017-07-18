import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TOwnProps = RouteComponentProps<{}>;
type TStateProps = {
  people: TPerson[];
  loaded: boolean;
} & TOwnProps;
type TDispatchProps = {
  reload: () => void;
};
type TProps = TStateProps & TDispatchProps;

// const styles = require<{ 'table-header-cell': string, numeric: string }>('./Tours.css');

class PeopleComponent extends React.Component<TProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { people, loaded } = this.props;
    if (!loaded) {
      return <div className="progress-linear" />;
    }

    const renderRow = (tour: TPerson) => (
      <tr key={tour.id}>
        <td>{tour.lastName} {tour.firstName}</td>
        <td>{tour.email}</td>
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
              <th>Email</th>
              <th>User</th>
              <th className="date">Last update</th>
              <th className="date">Created at</th>
            </tr>
          </thead>
          <tbody>
            {people.map(renderRow)}
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
  people: fromReducers.getPeople(state),
  loaded: fromReducers.arePeopleLoaded(state)
});

export const People = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  { reload: fromActions.people.reload }
)(PeopleComponent);