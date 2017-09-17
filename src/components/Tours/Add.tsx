import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import * as moment from 'moment';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

import { Lookup } from '../Lookup';
import { LookupEdit as RoutesLookup } from '../Routes';
import { AutoCompletePerson } from '../People';

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

const basePoints: TPoints[] = [15, 20, 40, 80, 150];
const pointsItems: { key: string; caption: string; points: TPoints; }[] =
  basePoints.map(p => ({ key: p.toString(), caption: p.toString(), points: p }));

class AddComponent extends React.Component<TProps> {
  render() {
    const { back, storeAdd, template } = this.props;

    const onPointsChanged = (values: string[]) => {
      const item = pointsItems.find(i => values.indexOf(i.key) !== -1);
      if (item) {
        storeAdd({ points: item.points });
      }
    };
    const onChanged =
      (handleChange: (value: string) => void): React.ReactEventHandler<HTMLInputElement | HTMLDivElement> =>
        (event) => {
          const target = event.target as HTMLInputElement;
          if (target.nodeName === 'INPUT') {
            handleChange(target.value);
          }
        };
    const onDateChanged = onChanged(value => storeAdd({ date: moment(value).isValid() ? value : undefined }));

    return (
      <Dialog open={true} maxWidth="sm" classes={{ paper: styles.dialog }}>
        <DialogTitle>Strecke hinzufügen</DialogTitle>
        <DialogContent className={styles.content}>
          <TextField label="Datum" type="date" onChange={onDateChanged} />
          <RoutesLookup value={template.route} onChange={value => storeAdd({ route: value })} />
          <Lookup
            label="Punkte"
            multiple={false}
            values={template.points ? [template.points.toString()] : []}
            items={pointsItems}
            onChange={onPointsChanged}
          />
          <AutoCompletePerson
            multiple={true}
            values={template.participants || []}
            onChange={values => storeAdd({ participants: values })}
          />
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
        this.props.add({ route, points, participants, date: dateValue.format('YYYY-MM-DD') });
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
