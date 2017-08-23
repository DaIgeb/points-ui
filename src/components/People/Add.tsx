import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

const styles = require<{
  title: string;
  dialog: string;
  content: string;
  add: string;
  container: string;
}>('./People.css');

type TOwnProps = {};
type TStateProps = {
  template: Partial<TPersonCreate>;
  state: TAddStates;
};
type TDispatchProps = {
  back: () => void;
  storeAdd: (data: Partial<TPersonCreate>) => void;
  add: (data: TPersonCreate) => void;
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

    const onFirstNameChanged = onChanged((value) => storeAdd({ firstName: value }));
    const onLastNameChanged = onChanged((value) => storeAdd({ lastName: value }));
    const onEmailChanged = onChanged((value) => storeAdd({ email: value }));

    return (
      <Dialog open={true} maxWidth="sm" classes={{ paper: styles.dialog }}>
        <DialogTitle>Fahrer hinzufügen</DialogTitle>
        <DialogContent className={styles.content}>
          <TextField label="First Name" onChange={onFirstNameChanged} />
          <TextField label="Last Name" onChange={onLastNameChanged} />
          <TextField label="Email" type="email" onChange={onEmailChanged} />
        </DialogContent>
        <DialogActions>
          <Button onClick={back} color="primary">Cancel</Button>
          <Button onClick={this.save} color="primary">Save</Button>
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
    const { firstName, lastName, email } = this.props.template;
    if (firstName && lastName && email) {
      this.props.add({ firstName, lastName, email });
    }
  }
}

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  template: fromReducers.addPersonTemplate(state),
  state: fromReducers.addPersonState(state)
});

export const Add = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    back: goBack,
    storeAdd: fromActions.people.storeAdd,
    add: fromActions.people.add
  }
)(AddComponent);
