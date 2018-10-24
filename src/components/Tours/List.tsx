import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';

import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import Delete from 'material-ui-icons/Delete';
import Refresh from 'material-ui-icons/Refresh';

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
  routes: TRoute[];
  routesLoaded: boolean;
  loaded: boolean;
};
type TDispatchProps = {
  reload: () => void;
  reloadRoutes: () => void;
  navigate: (uri: string) => void;
  remove: (id: string) => void;
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
    const { tours, routes, loaded, routesLoaded, navigate, remove } = this.props;
    if (!loaded || !routesLoaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <EnhancedTable
            title="Touren"
            columns={[
              {
                id:
                  'route',
                label: 'Strecke',
                value: (row: TTour) => {
                  const route = routes.find(r => r.id === row.route);
                  return route ? route.name : 'Unknown';
                }
              },
              { id: 'points', label: 'Punkte', type: 'number' },
              {
                id: 'date',
                label: 'Datum',
                render: (row: TTour) => <DateTime value={row.date} format="L" />
              },
              {
                id: 'participants',
                label: 'Teilnehmer',
                type: 'number',
                value: (row: TTour) => row.participants.length
              },
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
            renderToolbarActions={(numSelected, getSelection) => {
              if (numSelected > 0) {
                return <IconButton onClick={() => remove(getSelection()[0].id)}>
                  <Delete />
                </IconButton>;
              }

              return [
                <IconButton onClick={this.reload} key="refresh">
                  <Refresh />
                </IconButton>,
                <IconButton onClick={() => navigate('/tours/add')} key="add">
                  <AddCircle />
                </IconButton>
              ];
            }}
            data={tours}
            showDetails={id => navigate(`/tours/${id}`)}
          />
        </div >
      </div >
    );
  }

  private reload = () => {
    this.props.reload();
  }

  private initialize = (props: TProps) => {
    const { loaded, reload, routesLoaded, reloadRoutes } = props;
    if (!loaded) {
      reload();
    }
    if (!routesLoaded) {
      reloadRoutes();
    }
  }
}

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  tours: fromReducers.getTours(state),
  routes: fromReducers.getRoutes(state),
  routesLoaded: fromReducers.areRoutesLoaded(state),
  loaded: fromReducers.areToursLoaded(state)
});

export const List = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.tours.reload,
    remove: fromActions.tours.remove,
    reloadRoutes: fromActions.routes.reload,
    navigate: push
  }
)(ListComponent);