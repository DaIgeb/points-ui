import * as React from 'react';

type TClasses = {
  root: string;
  focused: string;
  disabled: string;
  error: string;
};
type TProps = {
  /**
   * The content of the component.
   */
  children: React.ReactNode,
  /**
   * @ignore
   */
  className: string,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled?: boolean,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error?: boolean,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused?: boolean,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required?: boolean,
};

const classes = require<TClasses>('./FormLabel');

export const FormLabel = (props: TProps, context: any) => {
  const {
    children,
    className: classNameProp,
    disabled: disabledProp,
    error: errorProp,
    focused: focusedProp,
    required: requiredProp,
    ...other
  } = props;

  const { muiFormControl } = context;

  let required = requiredProp;
  let focused = focusedProp;
  let disabled = disabledProp;
  let error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  const className = [classes.root];
  if (focused) {
    className.push(classes.focused);
  }
  if (disabled) {
    className.push(classes.disabled);
  }
  if (error) {
    className.push(classes.error);
  }
  className.push(classNameProp);

  const asteriskClassName = error ? classes.error : '';

  return (
    <label className={className.join(' ')} {...other}>
      {children}
      {required &&
        <span className={asteriskClassName} data-mui-test="FormLabelAsterisk">
          {'\u2009*'}
        </span>}
    </label>
  );
};