import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import * as moment from 'moment';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

import { Fields } from './Fields';

const styles = require<{ dialog: string; content: string; add: string; container: string; }>('./Tours.css');

type TOwnProps = {
  id: string;
};
type TStateProps = {
  template: TTour | undefined;
  baseTour: TTour | undefined;
  patchedTour: Partial<TTourCreate>;
  state: TEditStates;
};
type TDispatchProps = {
  back: () => void;
  store: (id: string, data: Partial<TTourCreate>) => void;
  save: (id: string, data: TTourCreate) => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

class EditComponent extends React.Component<TProps> {
  render() {
    const { back, store, template, id, patchedTour } = this.props;

    return (
      <Dialog open={true} maxWidth="sm" classes={{ paper: styles.dialog }}>
        <DialogTitle>Tour editieren</DialogTitle>
        <DialogContent className={styles.content}>
          {template && <Fields data={template} onChange={patch => store(id, patch)} />}
          {!template && <LinearProgress mode="indeterminate" />}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => this.save()}
            disabled={Object.keys(patchedTour).length === 0}
          >
            Save
          </Button>
          <Button onClick={() => back()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  componentWillReceiveProps(nextProps: TProps) {
    if (nextProps.state === 'success' && this.props.state !== nextProps.state) {
      this.props.back();
    }
  }

  private save = () => {
    const { template, id } = this.props;
    if (template) {
      const { route, points, participants, date } = template;
      if (route && points && participants && date) {
        const dateValue = moment(date);
        if (dateValue.isValid()) {
          this.props.save(id, {
            route,
            points,
            participants: participants.filter(p => p && p.length > 5),
            date: dateValue.format('YYYY-MM-DD')
          });
        }
      }
    }
  }
}

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => {
  const baseTour = fromReducers.getTour(state, ownProps.id);
  const patchedTour = fromReducers.editTourTemplate(state);

  return ({
    template: baseTour ? {
      ...baseTour,
      ...patchedTour
    } : undefined,
    baseTour,
    patchedTour,
    state: fromReducers.editTourState(state)
  });
};

export const Edit = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    back: goBack,
    store: fromActions.tours.storeEdit,
    save: fromActions.tours.save
  }
)(EditComponent);
