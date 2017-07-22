import * as React from 'react';

type TStyle = {
  root: string;
  marginNormal: string;
  marginDense: string;
  fullWidth: string;
};

const classes = require<TStyle>('./FromControl.css');

const buildClassNames = (props: TProps) => {
  const classNames = [classes.root];
  if (props.margin === 'normal') {
    classNames.push(classes.marginNormal);
  }
  if (props.margin === 'dense') {
    classNames.push(classes.marginDense);
  }
  if (props.fullWidth) {
    classNames.push(classes.fullWidth);
  }

  return classNames.join(' ');
};

type TProps = {
  margin?: 'none' | 'dense' | 'normal';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  ref?: string;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
};

type TState = {
  focused: boolean;
  dirty: boolean;
};

type TChildContext = {
  muiFormControl: {
    dirty?: boolean;
    disabled?: boolean;
    error?: boolean;
    focused?: boolean;
    margin?: 'normal' | 'dense' | 'none';
    required?: boolean;
    onDirty?: React.FocusEventHandler<HTMLDivElement>;
    onClean?: React.FocusEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
  }
};

export class FormControl extends React.Component<TProps, TState> implements React.ChildContextProvider<TChildContext> {
  constructor(props: TProps, context: object) {
    super(props, context);

    this.state = {
      dirty: false,
      focused: false
    };
  }

  getChildContext(): TChildContext {
    const { disabled, error, required, margin } = this.props;
    const { dirty, focused } = this.state;

    return {
      muiFormControl: {
        dirty,
        disabled,
        error,
        focused,
        margin,
        required,
        onDirty: this.handleDirty,
        onClean: this.handleClean,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
      }
    };
  }

  render() {
    const {
      children,
      className,
      disabled,
      error,
      fullWidth,
      margin,
      ...other
    } = this.props;

    return (
      <div
        className={buildClassNames(this.props)}
        {...other}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {children}
      </div>
    );
  }

  private handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    if (!this.state.focused) {
      this.setState({ focused: true });
    }
  }

  private handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    if (this.state.focused) {
      this.setState({ focused: false });
    }
  }

  private handleDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  }

  private handleClean = () => {
    if (this.state.dirty) {
      this.setState({ dirty: false });
    }
  }
}