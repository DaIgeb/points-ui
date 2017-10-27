import * as React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import * as types from './types';

type TProps = {
  columns: types.TColumn[];
  onRequestSort: (column: types.TColumn) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: types.TSortOrder;
  orderBy: types.TColumn | undefined;
  rowCount: number;
  numSelected: number;
};

export class EnhancedTableHead extends React.Component<TProps> {
  createSortHandler = (column: types.TColumn) => () => {
    this.props.onRequestSort(column);
  }

  render() {
    const { columns: columnData, onSelectAllClick, order, orderBy, rowCount, numSelected } = this.props;

    return (
      <TableHead>
        <TableRow>
          {onSelectAllClick && <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>}
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.type === 'number'}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <TableSortLabel
                  active={orderBy === column}
                  direction={order}
                  onClick={this.createSortHandler(column)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}