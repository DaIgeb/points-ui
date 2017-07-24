export type TColumn = {
  id: string;
  numeric?: boolean;
  disablePadding?: boolean;
  label: string;
};

export type TSortOrder = 'asc' | 'desc';