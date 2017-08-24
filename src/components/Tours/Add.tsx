import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

import { Lookup } from '../Lookup';
import { Lookup as RoutesLookup } from '../Routes';
import { Lookup as PeopleLookup } from '../People';

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

    const onPointsChanged = (value: string) => {
      const item = pointsItems.find(i => i.key === value);
      if (item) {
        storeAdd({ points: item.points });
      }
    };

    return (
      <Dialog open={true} maxWidth="sm" classes={{ paper: styles.dialog }}>
        <DialogTitle>Strecke hinzufügen</DialogTitle>
        <DialogContent className={styles.content}>
          <RoutesLookup value={template.route} onChange={value => storeAdd({ route: value })} />
          <Lookup
            label="Punkte"
            value={template.points ? template.points.toString() : undefined}
            items={pointsItems}
            onChange={onPointsChanged}
          />
          <PeopleLookup
            value={template.participants ? template.participants[0] : undefined}
            onChange={value => storeAdd({ participants: [value] })}
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
    const { route, points, participants } = this.props.template;
    if (route && points && participants) {
      this.props.add({ route, points, participants });
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
