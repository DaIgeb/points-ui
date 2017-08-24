import * as React from 'react';
import { connect } from 'react-redux';

import { LinearProgress } from 'material-ui/Progress';

import { Lookup as BaseLookup } from '../Lookup';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TOwnProps = {
  value?: string;
  onChange: (selectedItem: string) => void;
};
type TStateProps = {
  routes: TRoute[];
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
    const { routes, onChange, loaded, value } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <BaseLookup
        value={value}
        items={routes.map(r => ({ key: r.id, caption: r.name }))}
        onChange={onChange}
        label="Strecke"
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

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  routes: fromReducers.getRoutes(state),
  loaded: fromReducers.areRoutesLoaded(state)
});

export const Lookup = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.routes.reload
  }
)(LookupComponent);