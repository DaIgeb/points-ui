import * as React from 'react';
import { connect } from 'react-redux';

import * as fromReducers from '../../reducers';

import { LookupView } from '../People';

type TEnhancedTour = TTour & { routeObj: TRoute | undefined };
type TStateProps = {
  tours: TEnhancedTour[];
};
type TDispatchProps = {};
type TOwnProps = {};
type TProps = TStateProps & TDispatchProps & TOwnProps;

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  tours: fromReducers
    .getToursForYear(state, 2017)
    .map(t => ({ ...t, routeObj: fromReducers.getRoute(state, t.route) }))
});

export const Report = connect(mapStateToProps)((props: TProps) => {
  const toursByPerson = props.tours.reduce<{ [participant: string]: TEnhancedTour[] }>(
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
    .reduce<{
      participant: string;
      totalPoints: number;
      distance: number;
      elevation: number;
      tourCount: number;
      tours: TEnhancedTour[]
    }[]>(
    (prev, p) => ([
      ...prev,
      {
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

  // TODO enhanced table

  return (
    <div>
      <p>Total Points {props.tours.length}</p>
      {toursByPersonSummedUp.map(p => {
        const tours = p.tours;
        return (
          <p key={p.participant}>
            <LookupView values={[p.participant]} /> {p.totalPoints} / {p.tourCount}
            ({p.distance}/{p.elevation})
            ({tours.map(t => t.routeObj ? t.routeObj.name : t.route).join()})
          </p>
        );
      })}
      <pre>{JSON.stringify(props.tours, null, 2)}</pre>
    </div>
  );
});