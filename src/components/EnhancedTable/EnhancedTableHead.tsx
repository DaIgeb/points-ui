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
};

export class EnhancedTableHead extends React.Component<TProps> {
  createSortHandler = (column: types.TColumn) => () => {
    this.props.onRequestSort(column);
  }

  render() {
    const { columns: columnData, onSelectAllClick, order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {onSelectAllClick && <TableCell checkbox={true}>
            <Checkbox onChange={onSelectAllClick} />
          </TableCell>}
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.type === 'number'}
                disablePadding={column.disablePadding}
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