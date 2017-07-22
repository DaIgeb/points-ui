import * as React from 'react';

type TProps = {
  mode: 'query' | 'indeterminate';
} | {
    mode: 'buffer';
    value: number;
    valueBuffer: number;
  }
  | {
    mode: 'determinate';
    value: number;
  };

type TClassNames = {
  root: string;
  rootBuffer: string;
  rootQuery: string;
  dashed: string;
  bar: string;
  indeterminateBar1: string;
  indeterminateBar2: string;
  determinateBar1: string;
  bufferBar1: string;
  bufferBar2: string;
};

const classes = require<TClassNames>('./ProgressBar.css');

export const ProgressBar = (props: TProps) => {
  const { mode, ...other } = props;

  const rootClasses = [classes.root];
  if (mode === 'buffer') {
    rootClasses.push(classes.rootBuffer);
  }
  if (mode === 'query') {
    rootClasses.push(classes.rootQuery);
  }

  const primaryClasses = [classes.bar];
  const secondaryClasses = [classes.bar];

  switch (mode) {
    case 'indeterminate':
    case 'query':
      primaryClasses.push(classes.indeterminateBar1);
      secondaryClasses.push(classes.indeterminateBar2);
      break;
    case 'determinate':
      primaryClasses.push(classes.determinateBar1);
      break;
    case 'buffer':
      primaryClasses.push(classes.bufferBar1);
      secondaryClasses.push(classes.bufferBar2);
      break;
    default:
      break;
  }

  const primary: React.CSSProperties = {};
  const secondary: React.CSSProperties = {};
  const rootProps = {};

  if (props.mode === 'determinate') {
    const { value } = props;
    primary.width = `${value}%`;
    rootProps['aria-valuenow'] = Math.round(value || 0);
  } else if (props.mode === 'buffer') {
    const { value, valueBuffer } = props;
    primary.width = `${value}%`;
    secondary.width = `${valueBuffer}%`;
  }

  return (
    <div className={rootClasses.join(' ')} {...rootProps} {...other}>
      {mode === 'buffer' ? <div className={classes.dashed} /> : null}
      <div className={primaryClasses.join(' ')} style={primary} />
      {mode === 'determinate'
        ? null
        : <div className={secondaryClasses.join(' ')} style={secondary} />}
    </div>
  );
};