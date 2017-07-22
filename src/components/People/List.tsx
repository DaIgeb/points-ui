import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';

import { ProgressBar } from '../ProgressBar';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

const styles = require<{ title: string; content: string; add: string; container: string; }>('./People.css');

type TOwnProps = RouteComponentProps<{}>;
type TStateProps = {
  people: TPerson[];
  loaded: boolean;
};
type TDispatchProps = {
  reload: () => void;
  navigate: (uri: string) => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

// const styles = require<{ 'table-header-cell': string, numeric: string }>('./Tours.css');

class ListComponent extends React.Component<TProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { people, loaded, navigate } = this.props;
    if (!loaded) {
      return <ProgressBar mode="indeterminate" />;
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
      <div className={styles.container}>
        <div className={styles.title}><h1>Fahrer</h1><button onClick={() => navigate('/members/add')}>Add</button></div>
        <div className={styles.content}>
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
  people: fromReducers.getPeople(state),
  loaded: fromReducers.arePeopleLoaded(state)
});

export const List = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.people.reload,
    navigate: push
  }
)(ListComponent);