import * as React from 'react';

import Paper from 'material-ui/Paper';
import { withStyles, Theme } from 'material-ui/styles';

import { Filter } from './Filter';
import { Report as ReportPart } from './Report';

const styles = (theme: Theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit * 3,
  }),
});

class ReportComponent extends React.Component<{ classes: { root: string; } }, { year: number; }> {
  constructor() {
    super();

    this.state = { year: new Date().getFullYear() };
  }
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Filter year={this.state.year} onChange={year => this.setState({ year })} />
        <ReportPart year={this.state.year} />
      </Paper>
    );
  }
}

export const Report = withStyles(styles)(ReportComponent);