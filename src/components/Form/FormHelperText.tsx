import * as React from 'react';

type TProps = {
  /**
   * The content of the component.
   */
  children?: React.ReactNode,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled?: boolean,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error?: boolean,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense',
};

type TClasses = {
  root: string;
  disabled: string;
  error: string;
  dense: string;
};

const classes = require<TClasses>('./FormHelperText.css');

export const FormHelperText = (props: TProps, context: { muiFormControl: TMuiFormControl }) => {
  const {
    children,
    className: classNameProp,
    disabled: disabledProp,
    error: errorProp,
    margin: marginProp,
    ...other
  } = props;
  const { muiFormControl } = context;

  let disabled = disabledProp;
  let error = errorProp;
  let margin = marginProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = muiFormControl.margin;
    }
  }

  const className = [classes.root];

  if (disabled) {
    className.push(classes.disabled);
  }
  if (error) {
    className.push(classes.error);
  }
  if (margin === 'dense') {
    className.push(classes.dense);
  }
  if (classNameProp) {
    className.push(classNameProp);
  }

  return (
    <p className={className.join(' ')} {...other}>
      {children}
    </p>
  );
};