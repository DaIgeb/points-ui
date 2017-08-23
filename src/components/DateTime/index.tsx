import * as React from 'react';

import * as moment from 'moment-timezone';

type TOwnProps = {
  value: Date | string | number;
  format?: string;
};

export const formats = {
  dateFormat: 'l',
  timeFormat: 'LT z',
  dateTimeFormat: 'l @ LT z'
};

const defaultTimezone = 'Europe/Zurich';

// tslint:disable-next-line:variable-name
export const DateTime = (props: TOwnProps) => {
  const { value, format } = props;

  const date = moment(value);
  if (date.isValid()) {
    return <div>{date.tz(defaultTimezone).format(format || formats.dateTimeFormat)}</div>;
  }

  return null;
};