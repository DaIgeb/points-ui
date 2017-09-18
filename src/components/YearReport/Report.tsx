import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as fromReducers from '../../reducers';

import { EnhancedTable } from '../EnhancedTable';

import { LookupView } from '../People';

type TEnhancedTour = TTour & { routeObj: TRoute | undefined };
type TGroupedTours = {
  id: string;
  participant: string;
  totalPoints: number;
  distance: number;
  elevation: number;
  tourCount: number;
  tours: TEnhancedTour[]
};
type TStateProps = {
  tours: TTour[];
  groupedTours: TGroupedTours[];
};
type TDispatchProps = {};
type TOwnProps = {};
type TProps = TStateProps & TDispatchProps & TOwnProps;

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => {
  const tours = fromReducers
    .getToursForYear(state, 2017)
    .map(t => ({ ...t, routeObj: fromReducers.getRoute(state, t.route) }));
  return ({
    tours,
    groupedTours: mapToursSelector(tours)
  });
};

const mapToursSelector = createSelector(
  (args: TEnhancedTour[]) => args,
  (tours: TEnhancedTour[]) => {
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
          participant: p,
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

export const Report = connect(mapStateToProps)((props: TProps) => (
  <div>
    <p>Total Tour count: {props.tours.length}</p>
    <EnhancedTable
      title="Punkte"
      columns={[
        { id: 'name', label: 'Name', render: (row: TGroupedTours) => <LookupView values={[row.participant]} /> },
        { id: 'totalPoints', label: 'Punkte', type: 'number' },
        { id: 'tourCount', label: 'Anzahl Touren', type: 'number' },
        { id: 'distance', label: 'Distanz', type: 'number' },
        { id: 'elevation', label: 'Höhenmeter', type: 'number' },
        {
          id: 'tours',
          label: 'Touren',
          type: 'string',
          value: (row: TGroupedTours) => row.tours.map(t => t.routeObj ? t.routeObj.name : t.route).join()
        }
      ]}
      renderToolbarActions={() => <div />}
      data={props.groupedTours}
    />
  </div>
)
);