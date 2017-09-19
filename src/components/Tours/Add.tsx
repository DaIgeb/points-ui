import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import * as moment from 'moment';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

import { Fields } from './Fields';

const styles = require<{ dialog: string; content: string; add: string; container: string; }>('./Tours.css');

type TOwnProps = {};
type TStateProps = {
  template: Partial<TTourCreate>;
  state: TAddStates;
};
type TDispatchProps = {
  back: () => void;
  storeAdd: (data: Partial<TTourCreate>) => void;
  add: (data: TTourCreate) => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

class AddComponent extends React.Component<TProps> {
  render() {
    const { back, storeAdd, template } = this.props;

    return (
      <Dialog open={true} maxWidth="sm" classes={{ paper: styles.dialog }}>
        <DialogTitle>Tour hinzufügen</DialogTitle>
        <DialogContent className={styles.content}>
          <Fields data={template} onChange={storeAdd} />
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
    const { route, points, participants, date } = this.props.template;
    if (route && points && participants && date) {
      const dateValue = moment(date);
      if (dateValue.isValid()) {
        this.props.add({
          route,
          points,
          participants: participants.filter(p => p && p.length > 5),
          date: dateValue.format('YYYY-MM-DD')
        });
      }
    }
  }
}

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  template: fromReducers.addTourTemplate(state),
  state: fromReducers.addTourState(state)
});

export const Add = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    back: goBack,
    storeAdd: fromActions.tours.storeAdd,
    add: fromActions.tours.add
  }
)(AddComponent);
