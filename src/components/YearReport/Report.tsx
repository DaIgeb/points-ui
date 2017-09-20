import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { push, goBack } from 'react-router-redux';

import { LinearProgress } from 'material-ui/Progress';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

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
  (tours: TEnhancedTour[], people: TPerson[]) => {
    const toursByPerson = tours.reduce<{ [participant: string]: TEnhancedTour[] }>(
      (prev, cur) => ({
        ...prev,
        ...cur.participants.reduce<{ [participant: string]: TEnhancedTour[] }>(
          (partPrev, curPart) => ({
            ...(partPrev || {}),
            [curPart]: [...((partPrev || {})[curPart] || []), cur]
          }),
          prev)
      }),
      {}
    );

    const toursByPersonSummedUp = Object
      .keys(toursByPerson)
      .reduce<TGroupedTours[]>(
      (prev, p) => ([
        ...prev,
        {
          id: p,
          participant: people.find(person => person.id === p),
          tours: toursByPerson[p],
          tourCount: toursByPerson[p].length,
          elevation: toursByPerson[p].reduce((sum, cur) => sum + (cur.routeObj ? cur.routeObj.elevation : 0), 0),
          distance: toursByPerson[p].reduce((sum, cur) => sum + (cur.routeObj ? cur.routeObj.distance : 0), 0),
          totalPoints: toursByPerson[p].reduce((sum, cur) => sum + cur.points, 0)
        }
      ]),
      []
      );
    toursByPersonSummedUp.sort((a, b) => b.totalPoints - a.totalPoints);

    return toursByPersonSummedUp;
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
        <EnhancedTable
          title="Punkte"
          columns={[
            {
              id: 'name',
              label: 'Name',
              value: (row: TGroupedTours) =>
                row.participant ? `${row.participant.lastName} ${row.participant.firstName}` : row.id
            },
            { id: 'totalPoints', label: 'Punkte', type: 'number' },
            { id: 'tourCount', label: 'Anzahl Touren', type: 'number' },
            { id: 'distance', label: 'Distanz', type: 'number' },
            { id: 'elevation', label: 'Höhenmeter', type: 'number' }
          ]}
          renderToolbarActions={() => <div />}
          data={groupedTours}
          showDetails={id => navigate('/reports/' + id)}
        />
        <PrivateRoute
          path="/reports/:id"
          exact={true}
          render={(props: RouteComponentProps<{ id: string; }>) => <PersonDetails
            close={() => back()}
            data={groupedTours.find(t => t.id === props.match.params.id)}
          />}
        />
      </div>
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