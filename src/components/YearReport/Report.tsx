import * as React from 'react';
import { connect } from 'react-redux';

import * as fromReducers from '../../reducers';

import { LookupView } from '../People';

type TStateProps = {
  tours: TTour[];
};
type TDispatchProps = {};
type TOwnProps = {};
type TProps = TStateProps & TDispatchProps & TOwnProps;

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  tours: fromReducers.getToursForYear(state, 2017)
});

export const Report = connect(mapStateToProps)((props: TProps) => {
  const toursByPerson = props.tours.reduce<{ [participant: string]: TTour[] }>(
    (prev, cur) => ({
      ...prev,
      ...cur.participants.reduce<{ [participant: string]: TTour[] }>(
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
    .reduce<{ participant: string; totalPoints: number; tourCount: number; tours: TTour[] }[]>(
    (prev, p) => ([
      ...prev,
      {
        participant: p,
        tours: toursByPerson[p],
        tourCount: toursByPerson[p].length,
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
        const tours = p;
        return (
          <p key={p.participant}><LookupView values={[p.participant]} /> {tours.totalPoints} / {tours.tourCount}</p>
        );
      })}
      <pre>{JSON.stringify(props.tours, null, 2)}</pre>
    </div>
  );
});