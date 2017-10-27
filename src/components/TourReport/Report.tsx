import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { push, goBack } from 'react-router-redux';

import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import Download from 'material-ui-icons/FileDownload';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';
import * as fromUtils from '../../utils';

import { EnhancedTable } from '../EnhancedTable';
import { PrivateRoute } from '../PrivateRoute';
import { PersonDetails } from './Detail';
import { TGroupedTours, TEnhancedTour } from './types';

type TStateProps = {
  tours: TTour[];
  groupedTours: TGroupedTours[];
  toursLoaded: boolean;
  peopleLoaded: boolean;
  routesLoaded: boolean;
};
type TDispatchProps = {
  loadTours: () => void;
  loadPeople: () => void;
  loadRoutes: () => void;
  back: () => void;
  navigate: (uri: string) => void;
};
type TOwnProps = {
  year: number;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

const fields = [
  {
    label: 'Tour',
    value: (row: TGroupedTours) => row.tour.routeObj ? row.tour.routeObj.name : row.tour.id
  },
  {
    label: 'Datum',
    value: (row: TGroupedTours) => row.tour.date
  },
  {
    label: 'Punkte',
    value: 'totalPoints',
  },
  {
    label: 'Anzahl Teilnehmer',
    value: 'participantCount',
  },
  {
    label: 'Teilnehmer',
    value: (row: TGroupedTours) => row.participants.map((p) => p && `${p.lastName} ${p.firstName}`).join(),
  },
  {
    label: 'Distanz',
    value: 'distance',
  },
  {
    label: 'Höhenmeter',
    value: 'elevation'
  }
];

const bindActionCreators: TDispatchProps = {
  loadTours: fromActions.tours.reload,
  loadPeople: fromActions.people.reload,
  loadRoutes: fromActions.routes.reload,
  back: goBack,
  navigate: push
};

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => {
  const mappedTours = mapRoutesSelector({
    tours: fromReducers.getToursForYear(state, ownProps.year),
    routes: fromReducers.getRoutes(state)
  });

  return ({
    tours: mappedTours,
    groupedTours: mapToursSelector({ tours: mappedTours, people: fromReducers.getPeople(state) }),
    toursLoaded: fromReducers.areToursLoaded(state),
    peopleLoaded: fromReducers.arePeopleLoaded(state),
    routesLoaded: fromReducers.areRoutesLoaded(state)
  });
};

const mapRoutesSelector = createSelector(
  (args: { tours: TTour[]; routes: TRoute[]; }) => args.tours,
  (args: { tours: TTour[]; routes: TRoute[]; }) => args.routes,
  (tours: TTour[], routes: TRoute[]) => tours.map(t => ({ ...t, routeObj: routes.find(r => r.id === t.route) }))
);

const mapToursSelector = createSelector(
  (args: { tours: TEnhancedTour[]; people: TPerson[]; }) => args.tours,
  (args: { tours: TEnhancedTour[]; people: TPerson[]; }) => args.people,
  (tours: TEnhancedTour[], people: TPerson[]): TGroupedTours[] => {
    return tours.map<TGroupedTours>((t) => {
      const participantCount = t.participants.length;
      const route = t.routeObj;

      return ({
        id: t.id,
        date: t.date,
        tour: t,
        totalPoints: t.points * participantCount,
        distance: (route ? route.distance : 0) * participantCount,
        elevation: (route ? route.elevation : 0) * participantCount,
        participantCount,
        participants: t.participants.map((p) => people.find((person) => person.id === p))
      });
    });
  }
);

// tslint:disable-next-line
class ReportComponent extends React.Component<TProps & RouteComponentProps<any>> {
  componentWillMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps: TProps) {
    this.initialize(nextProps);
  }

  render() {
    const { tours, groupedTours, peopleLoaded, toursLoaded, routesLoaded, navigate, back } = this.props;

    if (!peopleLoaded || !toursLoaded || !routesLoaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <div>
        <p>Total Tour count: {tours.length}</p>
        <p>Total Tour distance: {groupedTours.reduce((prev, t) => prev + t.distance, 0)}</p>
        <p>Total Tour elevation: {groupedTours.reduce((prev, t) => prev + t.elevation, 0)}</p>
        <p>Total Tour points: {groupedTours.reduce((prev, t) => prev + t.totalPoints, 0)}</p>
        <EnhancedTable
          title="Punkte"
          columns={[
            {
              id: 'name',
              label: 'Name',
              value: (row: TGroupedTours) => row.tour.routeObj ? row.tour.routeObj.name : row.id
            },
            { id: 'date', label: 'Datum', type: 'date' },
            { id: 'totalPoints', label: 'Punkte', type: 'number' },
            { id: 'participantCount', label: 'Anzahl Teilnehmer', type: 'number' },
            { id: 'distance', label: 'Distanz', type: 'number' },
            { id: 'elevation', label: 'Höhenmeter', type: 'number' },
            {
              id: 'tours',
              label: 'Teilnehmer',
              type: 'string',
              value: (row: TGroupedTours) => row.participants.map(t => t ? t.lastName : t).join()
            }
          ]}
          renderToolbarActions={(numSelected: number, getSelection: () => TGroupedTours[]) => {
            if (numSelected > 0) {
              return <IconButton onClick={() => this.download(getSelection())}>
                <Download />
              </IconButton>;
            }

            return <div />;
          }}
          data={groupedTours}
          showDetails={id => navigate('/reports/tour/' + id)}
        />
        <PrivateRoute
          path="/reports/tour/:id"
          exact={true}
          render={(props: RouteComponentProps<{ id: string; }>) => <PersonDetails
            close={() => back()}
            data={groupedTours.find(t => t.id === props.match.params.id)}
          />}
        />
      </div>
    );
  }

  private download = (data: TGroupedTours[]) => {
    fromUtils.csv.download(
      { data, fields },
      `year-by-date-report-${this.props.year}.csv`
    );
  }

  private initialize = (props: TProps) => {
    const { loadPeople, peopleLoaded, loadTours, toursLoaded, loadRoutes, routesLoaded } = props;

    if (!peopleLoaded) {
      loadPeople();
    }
    if (!toursLoaded) {
      loadTours();
    }
    if (!routesLoaded) {
      loadRoutes();
    }
  }
}

export const Report = withRouter<{ year: number }>(connect(mapStateToProps, bindActionCreators)(ReportComponent));