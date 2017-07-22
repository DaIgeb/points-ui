import * as React from 'react';

type TDirtyCheck = { value?: string | number; defaultValue?: string | number } | null;
const foo: number = 1;
foo.toString();
export function isDirty(obj: TDirtyCheck, SSR: boolean = false) {
  if (obj) {
    const { value, defaultValue } = obj;
    if (value && value.toString().length > 0) {
      return true;
    }
    if (SSR && defaultValue && defaultValue.toString().length > 0) {
      return true;
    }
  }

  return false;
}

type DefaultProps = {
  disableUnderline: boolean,
  fullWidth: boolean,
  multiline: boolean,
  type: string,
};

type Props = DefaultProps & {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusion, it's more like an autofill.
   * You can learn about it with that article
   * https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
   */
  autoComplete?: string,
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus?: boolean,
  /**
   * The CSS class name of the wrapper element.
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * It's an `input` by default.
   */
  component?: string | React.ComponentType,
  /**
   * The default input value, useful when not controlling the component.
   */
  defaultValue?: string | number,
  /**
   * TODO
   */
  disabled?: boolean,
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean,
  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error?: boolean,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean,
  /**
   * The id of the `input` element.
   */
  id?: string,
  /**
   * Properties applied to the `input` element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense',
  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline?: boolean,
  /**
   * TODO
   */
  name?: string,
  /**
   * TODO
   */
  onBlur?: Function,
  /**
   * TODO
   */
  onChange?: Function,
  /**
   * TODO
   */
  onClean?: Function,
  /**
   * TODO
   */
  onDirty?: Function,
  /**
   * TODO
   */
  onFocus?: Function,
  /**
   * TODO
   */
  onKeyDown?: Function,
  /**
   * TODO
   */
  onKeyUp?: Function,
  /**
   * TODO
   */
  placeholder?: string,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number,
  /**
   * Maxium number of rows to display when multiline option is set to true.
   */
  rowsMax?: string | number,
  /**
   * Type of the input element. It should be a valid HTML5 input type.
   */
  type?: string,
  /**
   * The input value, required for a controlled component.
   */
  value?: string | number,
};

type State = {
  focused: boolean,
};

export class Input extends React.Component<Props, State> {
  static muiName = 'Input';
  static defaultProps = {
    disableUnderline: false,
    fullWidth: false,
    multiline: false,
    type: 'text',
  };
  state = {
    focused: false,
  };

  // Holds the input reference
  private input: HTMLInputElement | HTMLTextAreaElement | null = null;

  componentWillMount() {
    if (this.isControlled()) {
      this.checkDirty(this.props);
    }
  }

  componentDidMount() {
    if (!this.isControlled()) {
      this.checkDirty(this.input);
    }
  }

  componentWillUpdate(nextProps: Props) {
    if (this.isControlled()) {
      this.checkDirty(nextProps);
    } // else performed in the onChange
  }

  render() {
    const {
      autoComplete,
      autoFocus,
      className: classNameProp,
      component,
      defaultValue,
      disabled: disabledProp,
      disableUnderline,
      error: errorProp,
      fullWidth,
      id,
      inputProps: inputPropsProp,
      inputRef,
      margin: marginProp,
      multiline,
      onBlur,
      onFocus,
      onChange,
      onClean,
      onDirty,
      onKeyDown,
      onKeyUp,
      placeholder,
      name,
      rows,
      rowsMax,
      type,
      value,
      ...other
    } = this.props;

    const { muiFormControl } = this.context;

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

    const className = classNames(
      classes.root,
      {
        [classes.disabled]: disabled,
        [classes.error]: error,
        [classes.fullWidth]: fullWidth,
        [classes.focused]: this.state.focused,
        [classes.formControl]: muiFormControl,
        [classes.inkbar]: !disableUnderline,
        [classes.multiline]: multiline,
        [classes.underline]: !disableUnderline,
      },
      classNameProp,
    );

    const inputClassName = classNames(classes.input, {
      [classes.inputDisabled]: disabled,
      [classes.inputSingleline]: !multiline,
      [classes.inputMultiline]: multiline,
      [classes.inputDense]: margin === 'dense',
    });

    const required = muiFormControl && muiFormControl.required === true;

    let InputComponent: string |
      React.ComponentType<
      React.InputHTMLAttributes<HTMLInputElement> |
      React.TextareaHTMLAttributes<HTMLTextAreaElement>
      > = 'input';
    let inputProps: any = {
      ref: this.handleRefInput,
      ...inputPropsProp,
    };

    if (component) {
      inputProps = {
        rowsMax,
        ...inputProps,
      };
      InputComponent = component;
    } else if (multiline) {
      if (rows && !rowsMax) {
        inputProps = {
          ...inputProps,
        };
        InputComponent = 'textarea';
      } else {
        inputProps = {
          rowsMax,
          textareaRef: this.handleRefTextarea,
          ...inputProps,
          ref: null,
        };
        InputComponent = Textarea;
      }
    }

    return (
      <div className={className} {...other}>
        <InputComponent
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={inputClassName}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          disabled={disabled}
          aria-required={required ? true : undefined}
          value={value}
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          rows={rows}
          {...inputProps}
        />
      </div>
    );
  }

  private handleFocus = (event: React.FocusEvent<{}>) => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  private handleBlur = (event: React.FocusEvent<{}>) => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  private handleChange = (event: React.ChangeEvent<{}>) => {
    if (!this.isControlled()) {
      this.checkDirty(this.input);
    } // else perform in the willUpdate
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  private handleRefInput = (node: HTMLInputElement) => {
    this.input = node;
    if (this.props.inputRef) {
      this.props.inputRef(node);
    }
  }

  private handleRefTextarea = (node: HTMLTextAreaElement) => {
    this.input = node;
    if (this.props.inputRef) {
      if (typeof this.props.inputRef !== 'string')
        this.props.inputRef(node);
    }
  }

  private isControlled() {
    return typeof this.props.value === 'string';
  }

  private checkDirty(obj: TDirtyCheck) {
    const { muiFormControl } = this.context;

    if (isDirty(obj)) {
      if (muiFormControl && muiFormControl.onDirty) {
        muiFormControl.onDirty();
      }
      if (this.props.onDirty) {
        this.props.onDirty();
      }
      return;
    }

    if (muiFormControl && muiFormControl.onClean) {
      muiFormControl.onClean();
    }
    if (this.props.onClean) {
      this.props.onClean();
    }
  }
}