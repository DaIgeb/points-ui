import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { LinearProgress } from 'material-ui/Progress';

import { AutoComplete } from '../AutoComplete';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TViewOwnProps = {
  value?: string;
};

type TEditOwnProps = TViewOwnProps & {
  onChange: (selectedItem: string | undefined) => void;
};
type TStateProps = {
  route: TRoute | undefined;
  routes: { key: string; caption: string; }[];
  loaded: boolean;
};
type TDispatchProps = {
  reload: () => void;
};
type TViewProps = TStateProps & TDispatchProps & TViewOwnProps;
type TEditProps = TViewProps & TEditOwnProps;

class AutoCompleteComponent extends React.Component<TEditProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TEditProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { onChange, route } = this.props;

    const value = route ? { caption: route.name, key: route.id } : undefined;

    return (
      <AutoComplete
        label="Start typing the route name"
        getItems={this.getSuggestions}
        value={value}
        onChange={onChange}
      />
    );
  }

  private getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.props.routes.filter(route => {
        const keep =
          count < 5 && route.caption.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
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
  route: ownProps.value ? fromReducers.getRoute(state, ownProps.value) : undefined,
  loaded: fromReducers.areRoutesLoaded(state)
});
const bindActionCreators: TDispatchProps = {
  reload: fromActions.routes.reload
};

export const LookupEdit = connect<TStateProps, TDispatchProps, TEditOwnProps>(
  mapStateToProps,
  bindActionCreators
)(AutoCompleteComponent);

export const LookupView = connect<TStateProps, TDispatchProps, TViewOwnProps>(
  mapStateToProps,
  bindActionCreators
)(LookupViewComponent);