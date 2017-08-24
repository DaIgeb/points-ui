import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { LinearProgress } from 'material-ui/Progress';

import { Lookup as BaseLookup } from '../Lookup';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TOwnProps = {
  values: string[];
  multiple?: boolean;
  onChange: (selectedItems: string[]) => void;
};
type TStateProps = {
  people: { key: string; caption: string; }[];
  loaded: boolean;
};
type TDispatchProps = {
  reload: () => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

type TComponentState = { anchorEl: HTMLElement | undefined, open: boolean };

class LookupComponent extends React.Component<TProps, TComponentState> {
  constructor() {
    super();

    this.state = {
      anchorEl: undefined,
      open: false
    };
  }
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { people, onChange, loaded, values, multiple } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <BaseLookup
        values={values}
        multiple={multiple || false}
        items={people}
        onChange={onChange}
        label="Fahrer"
      />
    );
  }

  private initialize = (props: TProps) => {
    const { loaded, reload } = props;
    if (!loaded) {
      reload();
    }
  }
}

const mapPeopleSelector = createSelector(
  (args: { people: TPerson[] }) => args.people,
  people => people
    .map(r => ({ key: r.id, caption: `${r.lastName} ${r.firstName}` }))
    .sort((a, b) => a.caption.localeCompare(b.caption))
);

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  people: mapPeopleSelector({ people: fromReducers.getPeople(state) }),
  loaded: fromReducers.arePeopleLoaded(state)
});

export const Lookup = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.people.reload
  }
)(LookupComponent);