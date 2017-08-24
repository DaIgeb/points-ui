import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';

import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import Delete from 'material-ui-icons/Delete';

import { EnhancedTable } from '../EnhancedTable';
import { DateTime } from '../DateTime';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

const styles = require<{
  title: string;
  content: string;
  add: string;
  container: string;
}>('./Tours.css');

type TOwnProps = RouteComponentProps<{}>;
type TStateProps = {
  tours: TTour[];
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
    const { tours, loaded, navigate } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <EnhancedTable
            title="Fahrer"
            columns={[
              { id: 'route', label: 'Strecke' },
              { id: 'points', label: 'Punkte' },
              {
                id: 'createdAt',
                label: 'Erstellt am',
                render: (row: TTour) => <DateTime value={row.createdAt} />
              },
              {
                id: 'updateAt',
                label: 'Aktualisiert am',
                render: (row: TTour) => <DateTime value={row.updatedAt} />
              },
              { id: 'user', label: 'User' }
            ]}
            renderToolbarActions={(numSelected: number) => {
              if (numSelected > 0) {
                return <IconButton>
                  <Delete />
                </IconButton>;
              }

              return <IconButton onClick={() => navigate('/tours/add')}>
                <AddCircle />
              </IconButton>;
            }}
            data={tours}
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
  tours: fromReducers.getTours(state),
  loaded: fromReducers.areToursLoaded(state)
});

export const List = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.tours.reload,
    navigate: push
  }
)(ListComponent);