import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

const styles = require<{ dialog: string; content: string; add: string; container: string; }>('./Routes.css');

type TOwnProps = {};
type TStateProps = {
  template: Partial<TRouteCreate>;
  state: TAddStates;
};
type TDispatchProps = {
  back: () => void;
  storeAdd: (data: Partial<TRouteCreate>) => void;
  add: (data: TRouteCreate) => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

class AddComponent extends React.Component<TProps> {
  render() {
    const { back, storeAdd } = this.props;
    const onChanged =
      (handleChange: (value: string) => void): React.ReactEventHandler<HTMLInputElement | HTMLDivElement> =>
        (event) => {
          const target = event.target as HTMLInputElement;
          if (target.nodeName === 'INPUT') {
            handleChange(target.value);
          }
        };

    const onNameChanged = onChanged((value) => storeAdd({ name: value }));
    const onDistanceChanged = onChanged((value) => storeAdd({ distance: parseFloat(value) }));
    const onElevationChanged = onChanged((value) => storeAdd({ elevation: parseFloat(value) }));

    return (
      <Dialog open={true} maxWidth="sm" classes={{ paper: styles.dialog }}>
        <DialogTitle>Fahrer hinzufügen</DialogTitle>
        <DialogContent className={styles.content}>
          <TextField label="Name" onChange={onNameChanged} />
          <TextField label="Distance" type="number" onChange={onDistanceChanged} />
          <TextField label="Elevation" type="number" onChange={onElevationChanged} />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => this.save()}>Save</Button>
          <Button onClick={() => back()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }

  componentWillReceiveProps(nextProps: TProps) {
    if (Object.keys(nextProps.template).length === 0 && Object.keys(this.props.template).length > 0) {
      this.props.back();
    }
  }

  private save = () => {
    const { name, distance, elevation } = this.props.template;
    if (name && distance && elevation) {
      this.props.add({ name, distance, elevation });
    }
  }
}

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  template: fromReducers.addRouteTemplate(state),
  state: fromReducers.addRouteState(state)
});

export const Add = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    back: goBack,
    storeAdd: fromActions.routes.storeAdd,
    add: fromActions.routes.add
  }
)(AddComponent);
