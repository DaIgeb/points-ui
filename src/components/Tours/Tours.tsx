import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

type TOwnProps = RouteComponentProps<{}>;
type TStateProps = {
  tours: TTour[];
  loaded: boolean;
} & TOwnProps;
type TDispatchProps = {
  reload: () => void;
};
type TProps = TStateProps & TDispatchProps;

class ToursComponent extends React.Component<TProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { tours, loaded } = this.props;
    return (
      <div >
        {loaded && tours.map(t => t.name).join()}
      </div >
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
  ...ownProps,
  tours: fromReducers.getTours(state),
  loaded: fromReducers.areToursLoaded(state)
});

export const Tours = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  { reload: fromActions.tours.reload }
)(ToursComponent);