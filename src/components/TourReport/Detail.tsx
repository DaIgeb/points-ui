import * as React from 'react';
import * as moment from 'moment';

import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import { DateTime } from '../DateTime';

import { TGroupedTours, TEnhancedTour } from './types';

export class PersonDetails extends React.Component<{ data: TGroupedTours | undefined; close: () => void; }> {
  render() {
    const { data, close } = this.props;
    return (
      <Dialog open={true} maxWidth="sm" >
        <DialogTitle>Fahrer Details</DialogTitle>
        <DialogContent>
          {!data && <div>Nothing found</div>}
          {data && <div>{data.tour.date} <TourTable tours={[data.tour]} /></div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

// tslint:disable-next-line
const TourTable = (props: { tours: TEnhancedTour[] }) => {
  const { tours } = props;
  const sortedTours = tours.sort((a, b) => {
    const aDate = moment(a.date);
    const bDate = moment(b.date);

    if (aDate.isSame(bDate)) {
      return 0;
    }

    return aDate.isBefore(bDate) ? -1 : 1;
  });
  return (
    <List>
      {sortedTours.map(t => (
        <ListItem key={t.id}>
          <DateTime value={t.date} format="L" />{t.routeObj ? t.routeObj.name : 'Unknown'}
        </ListItem>)
      )}
    </List>
  );
};
