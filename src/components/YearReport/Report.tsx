import * as React from 'react';
import { connect } from 'react-redux';

import * as fromReducers from '../../reducers';

type TStateProps = {
  tours: TTour[];
};
type TDispatchProps = {};
type TOwnProps = {};
type TProps = TStateProps & TDispatchProps & TOwnProps;

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  tours: fromReducers.getToursForYear(state, 2017)
});

export const Report = connect(mapStateToProps)((props: TProps) => <div>Total Points {props.tours.length}</div>);