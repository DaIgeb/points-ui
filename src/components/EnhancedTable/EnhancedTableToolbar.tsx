import * as React from 'react';

import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import DeleteIcon from 'material-ui-icons/Delete';
import FilterList from 'material-ui-icons/FilterList';

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
};

export const EnhancedTableToolbar = (props: TProps) => {
  const { numSelected, title } = props;

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
        {numSelected > 0
          ? <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
          : <IconButton aria-label="Filter list">
            <FilterList />
          </IconButton>}
      </div>
    </Toolbar>
  );
};