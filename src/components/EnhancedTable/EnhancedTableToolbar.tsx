import * as React from 'react';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const classes = require<{
  root: string;
  title: string;
  spacer: string;
  actions: string;
  highlight: string;
}>('./EnhancedTableToolbar.css');

type TProps = {
  numSelected: number;
  title: string;
  renderActions: (numSelected: number) => React.ReactNode;
};

export class EnhancedTableToolbar extends React.Component<TProps> {
  render() {
    const { numSelected, title, renderActions } = this.props;

    const toolbar = [classes.root];
    if (numSelected > 0) {
      toolbar.push(classes.highlight);
    }

    return (
      <Toolbar className={toolbar.join(' ')}>
        <div className={classes.title}>
          {numSelected > 0
            ? <Typography type="subheading">
              {numSelected} selected
            </Typography>
            : <Typography type="title">{title}</Typography>}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {renderActions(numSelected)}
        </div>
      </Toolbar>
    );
  }
}