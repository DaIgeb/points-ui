import * as React from 'react';

import TextField from 'material-ui/TextField';

export const Filter = (props: { onChange: (year: number) => void; year: number; }) => (
  <div>
    <TextField
      label="Select Year"
      type="number"
      value={props.year}
      onChange={(evt) => {
        const target = evt.target as HTMLInputElement;
        if (target.nodeName === 'INPUT') {
          props.onChange(parseInt(target.value, 10));
        }
      }}
    />
  </div>
);