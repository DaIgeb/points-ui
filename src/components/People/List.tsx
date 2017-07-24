import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';

import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { EnhancedTable } from '../EnhancedTable';

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
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}><h1>Fahrer</h1><Button onClick={() => navigate('/members/add')}>Add</Button></div>
        <div className={styles.content}>
          <EnhancedTable
            title="People"
            columns={[
              { id: 'firstName', label: 'First Name' },
              { id: 'name', label: 'Name', value: (row: TPerson) => `${row.firstName} + ${row.lastName}` },
              { id: 'lastName', label: 'Last Name' },
              { id: 'email', label: 'Email' }
            ]}
            data={people}
          />          
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