import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';

import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import Delete from 'material-ui-icons/Delete';
import Download from 'material-ui-icons/FileDownload';

import { EnhancedTable } from '../EnhancedTable';
import { DateTime } from '../DateTime';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

const styles = require<{
  title: string;
  content: string;
  add: string;
  container: string;
  'current-user': string;
}>('./People.css');

type TOwnProps = RouteComponentProps<{}>;
type TStateProps = {
  people: TPerson[];
  profile: TProfile | undefined,
  loaded: boolean;
};
type TDispatchProps = {
  reload: () => void;
  navigate: (uri: string) => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

class ListComponent extends React.Component<TProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { people, loaded, navigate, profile } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <EnhancedTable
            title="Fahrer"
            columns={[
              { id: 'name', label: 'Name', value: (row: TPerson) => `${row.firstName} ${row.lastName}` },
              { id: 'email', label: 'Email' },
              {
                id: 'createdAt',
                label: 'Erstellt am',
                render: (row: TPerson) => <DateTime value={row.createdAt} />
              },
              {
                id: 'updateAt',
                label: 'Aktualisiert am',
                render: (row: TPerson) => <DateTime value={row.updatedAt} />
              },
              { id: 'user', label: 'User' }
            ]}
            renderToolbarActions={(numSelected: number, getSelection: () => TPerson[]) => {
              if (numSelected > 0) {
                return <div>
                  <IconButton>
                    <Delete />
                  </IconButton>
                  <IconButton>
                    <Download />
                  </IconButton>
                </div>;
              }

              return <IconButton onClick={() => navigate('/members/add')}>
                <AddCircle />
              </IconButton>;
            }}
            rowClass={(r) => profile && r.id === profile.app_metadata.personId ? styles['current-user'] : undefined}
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
  profile: fromReducers.getProfile(state),
  loaded: fromReducers.arePeopleLoaded(state)
});

export const List = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.people.reload,
    navigate: push
  }
)(ListComponent);