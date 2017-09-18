import * as React from 'react';

export type TRow = {
  id: string;
  [index: string]: object | number | string | undefined;
};

export type TColumn = {
  id: string;
  type?: 'string' | 'number' | 'date' | 'datetime'
  disablePadding?: boolean;
  label: string;
  component?: React.ComponentType;
  render?: (data: TRow) => React.ReactNode;
  value?: (data: TRow) => string;
};

export type TSortOrder = 'asc' | 'desc';