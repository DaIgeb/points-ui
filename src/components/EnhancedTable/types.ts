import * as React from 'react';

export type TRow = {
  id: string;
  [index: string]: object | number | string;
};

export type TColumn = {
  id: string;
  numeric?: boolean;
  disablePadding?: boolean;
  label: string;
  component?: React.ComponentType;
  render?: (data: TRow) => React.ReactNode;
  value?: (data: TRow) => string;
};

export type TSortOrder = 'asc' | 'desc';