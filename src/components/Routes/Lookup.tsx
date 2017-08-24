import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { LinearProgress } from 'material-ui/Progress';

import { Lookup as BaseLookup } from '../Lookup';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TViewOwnProps = {
  value?: string;
};

type TEditOwnProps = TViewOwnProps & {
  onChange: (selectedItem: string | undefined) => void;
};
type TStateProps = {
  routes: { key: string; caption: string; }[];
  loaded: boolean;
};
type TDispatchProps = {
  reload: () => void;
};
type TViewProps = TStateProps & TDispatchProps & TViewOwnProps;
type TEditProps = TViewProps & TEditOwnProps;

type TComponentState = { anchorEl: HTMLElement | undefined, open: boolean };

class LookupEditComponent extends React.Component<TEditProps, TComponentState> {
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
  componentWillReceiveProps(nextProps: Readonly<TEditProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { routes, loaded, value } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <BaseLookup
        values={value ? [value] : []}
        multiple={false}
        items={routes}
        onChange={this.onRouteChanged}
        label="Strecke"
      />
    );
  }

  private onRouteChanged = (values: string[]) => {
    if (values.length > 0) {
      const { onChange } = this.props;

      onChange(values[0]);
    }
  }

  private initialize = (props: TEditProps) => {
    const { loaded, reload } = props;
    if (!loaded) {
      reload();
    }
  }
}

class LookupViewComponent extends React.Component<TViewProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TViewProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { routes, loaded, value } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (value) {
      const route = routes.find(r => r.key === value);
      if (route) {
        return <p>{route.caption}</p>;
      }

      return <p>Unbekannt {value}</p>;
    }
    return null;
  }

  private initialize = (props: TViewProps) => {
    const { loaded, reload } = props;
    if (!loaded) {
      reload();
    }
  }
}

const mapRoutesSelector = createSelector(
  (args: { routes: TRoute[] }) => args.routes,
  routes => routes
    .map(r => ({ key: r.id, caption: r.name }))
    .sort((a, b) => a.caption.localeCompare(b.caption))
);

const mapStateToProps = (state: TState, ownProps: TEditOwnProps): TStateProps => ({
  routes: mapRoutesSelector({ routes: fromReducers.getRoutes(state) }),
  loaded: fromReducers.areRoutesLoaded(state)
});
const bindActionCreators: TDispatchProps = {
  reload: fromActions.routes.reload
};
export const LookupEdit = connect<TStateProps, TDispatchProps, TEditOwnProps>(
  mapStateToProps,
  bindActionCreators
)(LookupEditComponent);

export const LookupView = connect<TStateProps, TDispatchProps, TViewOwnProps>(
  mapStateToProps,
  bindActionCreators
)(LookupViewComponent);