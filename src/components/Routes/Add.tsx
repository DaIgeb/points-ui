import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

const styles = require<{ title: string; content: string; add: string; container: string; }>('./People.css');

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
          const target = event.currentTarget;
          if (target.nodeName === 'INPUT') {
            const inputTarget = target as HTMLInputElement;

            handleChange(inputTarget.value);
          }
        };

    const onFirstNameChanged = onChanged((value) => storeAdd({ firstName: value }));
    const onLastNameChanged = onChanged((value) => storeAdd({ lastName: value }));
    const onEmailChanged = onChanged((value) => storeAdd({ email: value }));

    return (
      <div className={styles.container}>
        <div className={styles.title}><h1>Fahrer</h1><Button onClick={() => back()}>Close</Button></div>
        <div className={styles.content}>
          <TextField label="First Name" onChange={onFirstNameChanged} />
          <TextField label="Last Name" onChange={onLastNameChanged} />
          <TextField label="Email" type="email" onChange={onEmailChanged} />
          <div>
            <Button color="primary" onClick={() => this.save()}>Save</Button>
            <Button onClick={() => this.props.back()}>Cancel</Button>
          </div>
        </div >
      </div >
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
