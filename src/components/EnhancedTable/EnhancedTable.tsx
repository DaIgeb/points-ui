import * as React from 'react';

import keycode from 'keycode';
import Checkbox from 'material-ui/Checkbox';
import {
  TableCell,
  TableBody,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Table from 'material-ui/Table';

import { EnhancedTableHead } from './EnhancedTableHead';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import * as types from './types';

type TProps = {
  title: string;
  data: types.TRow[];
  columns: types.TColumn[];
};
type TState = {
  order: types.TSortOrder;
  orderBy: types.TColumn | undefined;
  selected: string[];
  data: types.TRow[];
};

const classes = require<{ paper: string }>('./EnhancedTable.css');

export class EnhancedTable extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: undefined,
      selected: [],
      data: props.data,
    };
  }

  render() {
    const { title, columns } = this.props;
    const { data, order, orderBy, selected } = this.state;

    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} title={title} />
        <Table>
          <EnhancedTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {data.map(n => {
              const isSelected = this.isSelected(n.id);
              return (
                <TableRow
                  hover={true}
                  onClick={event => this.handleClick(n.id)}
                  onKeyDown={event => this.handleKeyDown(event, n.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={n.id}
                  selected={isSelected}
                >
                  <TableCell checkbox={true}>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  {columns.map(c =>
                    <TableCell key={c.id} disablePadding={c.disablePadding} numeric={c.numeric}>
                      {c.value ? c.value(n) : n[c.id]}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  componentWillMount() {
    this.initializeProps(this.props);
  }

  componentWillReceiveProps(nextProps: TProps) {
    this.initializeProps(nextProps);
  }

  private initializeProps = (props: TProps) => {
    if (props.data.length !== this.state.data.length) {
      this.setState({ data: props.data });
      if (this.state.orderBy) {
        this.orderBy(this.state.orderBy, this.state.order);
      }
    }
  }

  private handleRequestSort = (event: React.MouseEvent<HTMLButtonElement>, property: types.TColumn): void => {
    const orderBy = property;
    let order: types.TSortOrder = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.orderBy(orderBy, order);
  }

  private orderBy = (orderBy: types.TColumn, order: types.TSortOrder) => {
    const data = this.state.data.sort((a, b) => {
      const aValue = orderBy.value ? orderBy.value(a) : a[orderBy.id];
      const bValue = orderBy.value ? orderBy.value(b) : b[orderBy.id];
      if (bValue === aValue) {
        return 0;
      }

      if (order === 'desc') {
        return bValue > aValue ? -1 : 1;
      }

      return aValue > bValue ? -1 : 1;
    });

    this.setState({ data, order, orderBy });
  }

  private handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  }

  private handleKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>, id: string) => {
    if (keycode(event) === 'space') {
      this.handleClick(id);
    }
  }

  private handleClick = (id: string) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  }

  private isSelected = (id: string): boolean => this.state.selected.indexOf(id) !== -1;
}