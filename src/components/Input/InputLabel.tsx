import * as React from 'react';

import { FormLabel } from '../Form';

type TClasses = {
  root: string;
  formControl: string;
  animated: string;
  shrink: string;
  disabled: string;
};

const classes = require<TClasses>('./InputLabel');

type TProps = {
  /**
   * The contents of the `InputLabel`.
   */
  children: React.ReactNode,

  /**
   * @ignore
   */
  className: string,
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: boolean,
  /**
   * If `true`, apply disabled class.
   */
  disabled?: boolean,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean,
  /**
   * If `true`, the input of this label is focused.
   */
  focused?: boolean,
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required?: boolean,
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean,
};

export type TInputLabelProps = TProps;

export const InputLabel = (props: TProps, context: any) => {
  const {
    disabled,
    disableAnimation,
    children,
    className: classNameProp,
    shrink: shrinkProp,
    ...other
  } = props;

  const { muiFormControl } = context;
  let shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.dirty || muiFormControl.focused;
  }

  const className = [classes.root];
  if (muiFormControl) {
    className.push(classes.formControl);
  }
  if (!disableAnimation) {
    className.push(classes.animated);
  }
  if (shrink) {
    className.push(classes.shrink);
  }
  if (disabled) {
    className.push(classes.disabled);
  }
  className.push(classNameProp);

  const { } = classes;

  return (
    <FormLabel className={className.join(' ')} {...other}>
      {children}
    </FormLabel>
  );
};