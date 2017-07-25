// Type definitions for material-ui v0.17.51
// Project: https://github.com/callemall/material-ui
// Definitions by: Nathan Brown <https://github.com/ngbrown>
//                 Igor Beagorudsky <https://github.com/theigor>
//                 Ali Taheri Moghaddar <https://github.com/alitaheri>
//                 Oliver Herrmann <https://github.com/herrmanno>
//                 Daniel Roth <https://github.com/DaIgeb>
//                 Aurelién Allienne <https://github.com/allienna>
//                 Matthias Schlesinger <https://github.com/schlesingermatthias>
//                 Jonathon Kelly <https://github.com/InsidersByte>
//                 Artyom Stukans <https://github.com/artyomsv>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/// <reference types="react" />
/// <reference types="react-addons-linked-state-mixin" />

declare module "material-ui" {
  export import AppBar = __MaterialUI.AppBar;
  export import Drawer = __MaterialUI.Drawer;
  export import LinearProgress = __MaterialUI.LinearProgress;
}

declare namespace __MaterialUI {
  // ReactLink is from "react/addons"
  interface ReactLink<T> {
    value: T;
    requestChange(newValue: T): void;
  }

  // What's common between React.TouchEvent and React.MouseEvent
  interface TouchTapEvent extends React.SyntheticEvent<{}> {
    altKey: boolean;
    ctrlKey: boolean;
    getModifierState(key: string): boolean;
    metaKey: boolean;
    shiftKey: boolean;
  }

  // What's common between React.TouchEventHandler and React.MouseEventHandler
  interface TouchTapEventHandler extends React.EventHandler<TouchTapEvent> {
  }

  interface ThemeWrapperProps {
    theme: Styles.MuiTheme;
  }
  export class ThemeWrapper extends React.Component<ThemeWrapperProps> {
  }

  export namespace Styles {
    interface Spacing {
      iconSize?: number;

      desktopGutter?: number;
      desktopGutterMore?: number;
      desktopGutterLess?: number;
      desktopGutterMini?: number;
      desktopKeylineIncrement?: number;
      desktopDropDownMenuItemHeight?: number;
      desktopDropDownMenuFontSize?: number;
      desktopLeftNavMenuItemHeight?: number;
      desktopSubheaderHeight?: number;
      desktopToolbarHeight?: number;
    }
    export var Spacing: Spacing;

    interface ThemePalette {
      primary1Color?: string;
      primary2Color?: string;
      primary3Color?: string;
      accent1Color?: string;
      accent2Color?: string;
      accent3Color?: string;
      textColor?: string;
      secondaryTextColor?: string;
      alternateTextColor?: string;
      canvasColor?: string;
      borderColor?: string;
      disabledColor?: string;
      pickerHeaderColor?: string;
      clockCircleColor?: string;
      shadowColor?: string;
    }
    export var ThemePalette: ThemePalette;
    interface MuiTheme {
      spacing?: Spacing;
      fontFamily?: string;
      palette?: ThemePalette;
      isRtl?: boolean;
      userAgent?: string | boolean;
      zIndex?: zIndex;
      baseTheme?: RawTheme;
      rawTheme?: RawTheme;
      appBar?: {
        color?: string;
        textColor?: string;
        height?: number;
        titleFontWeight?: number;
        padding?: number;
      };
      avatar?: {
        color?: string;
        backgroundColor?: string;
        borderColor?: string;
      };
      badge?: {
        color?: string;
        textColor?: string;
        primaryColor?: string;
        primaryTextColor?: string;
        secondaryColor?: string;
        secondaryTextColor?: string;
        fontWeight?: number;
      };
      button?: {
        height?: number;
        minWidth?: number;
        iconButtonSize?: number;
        textTransform?: string;
      };
      card?: {
        titleColor?: string;
        subtitleColor?: string;
        fontWeight?: number;
      };
      cardMedia?: {
        color?: string;
        overlayContentBackground?: string;
        titleColor?: string;
        subtitleColor?: string;
      };
      cardText?: {
        textColor?: string;
      };
      checkbox?: {
        boxColor?: string;
        checkedColor?: string;
        requiredColor?: string;
        disabledColor?: string;
        labelColor?: string;
        labelDisabledColor?: string;
      };
      chip?: {
        backgroundColor?: string;
        deleteIconColor?: string;
        textColor?: string;
        fontSize?: number;
        fontWeight?: number;
        shadow?: string;
      };
      datePicker?: {
        color?: string;
        textColor?: string;
        calendarTextColor?: string;
        selectColor?: string;
        selectTextColor?: string;
        calendarYearBackgroundColor?: string;
        headerColor?: string;
      };
      dialog?: {
        titleFontSize?: number;
        bodyFontSize?: number;
        bodyColor?: string;
      };
      dropDownMenu?: {
        accentColor?: string;
      };
      enhancedButton?: {
        tapHighlightColor?: string;
      };
      flatButton?: {
        color?: string;
        buttonFilterColor?: string;
        disabledTextColor?: string;
        textColor?: string;
        primaryTextColor?: string;
        secondaryTextColor?: string;
        fontSize?: number;
        fontWeight?: number;
      };
      floatingActionButton?: {
        buttonSize?: number;
        miniSize?: number;
        color?: string;
        iconColor?: string;
        secondaryColor?: string;
        secondaryIconColor?: string;
        disabledTextColor?: string;
        disabledColor?: string;
      };
      gridTile?: {
        textColor?: string;
      };
      icon?: {
        color?: string;
        backgroundColor?: string;
      };
      inkBar?: {
        backgroundColor?: string;
      };
      drawer?: {
        width?: number;
        color?: string;
      };
      listItem?: {
        nestedLevelDepth?: number;
        secondaryTextColor?: string;
        leftIconColor?: string;
        rightIconColor?: string;
      };
      menu?: {
        backgroundColor?: string;
        containerBackgroundColor?: string;
      };
      menuItem?: {
        dataHeight?: number;
        height?: number;
        hoverColor?: string;
        padding?: number;
        selectedTextColor?: string;
        rightIconDesktopFill?: string;
      };
      menuSubheader?: {
        padding?: number;
        borderColor?: string;
        textColor?: string;
      };
      overlay?: {
        backgroundColor?: string;
      };
      paper?: {
        color?: string;
        backgroundColor?: string;
        zDepthShadows?: string[];
      };
      radioButton?: {
        borderColor?: string;
        backgroundColor?: string;
        checkedColor?: string;
        requiredColor?: string;
        disabledColor?: string;
        size?: number;
        labelColor?: string;
        labelDisabledColor?: string;
      };
      raisedButton?: {
        color?: string;
        textColor?: string;
        primaryColor?: string;
        primaryTextColor?: string;
        secondaryColor?: string;
        secondaryTextColor?: string;
        disabledColor?: string;
        disabledTextColor?: string;
        fontSize?: number;
        fontWeight?: number;
      };
      refreshIndicator?: {
        strokeColor?: string;
        loadingStrokeColor?: string;
      };
      ripple?: {
        color?: string;
      };
      slider?: {
        trackSize?: number;
        trackColor?: string;
        trackColorSelected?: string;
        handleSize?: number;
        handleSizeDisabled?: number;
        handleSizeActive?: number;
        handleColorZero?: string;
        handleFillColor?: string;
        selectionColor?: string;
        rippleColor?: string;
      };
      snackbar?: {
        textColor?: string;
        backgroundColor?: string;
        actionColor?: string;
      };
      subheader?: {
        color?: string;
        fontWeight?: number;
      };
      stepper?: {
        backgroundColor?: string;
        hoverBackgroundColor?: string;
        iconColor?: string;
        hoveredIconColor?: string;
        inactiveIconColor?: string;
        textColor?: string;
        disabledTextColor?: string;
        connectorLineColor?: string;
      };
      svgIcon?: {
        color?: string,
      };
      table?: {
        backgroundColor?: string;
      };
      tableFooter?: {
        borderColor?: string;
        textColor?: string;
      };
      tableHeader?: {
        borderColor?: string;
      };
      tableHeaderColumn?: {
        textColor?: string;
        height?: number;
        spacing?: number;
      };
      tableRow?: {
        hoverColor?: string;
        stripeColor?: string;
        selectedColor?: string;
        textColor?: string;
        borderColor?: string;
        height?: number;
      };
      tableRowColumn?: {
        height?: number;
        spacing?: number;
      };
      tabs?: {
        backgroundColor?: string;
        textColor?: string;
        selectedTextColor?: string;
      };
      textField?: {
        textColor?: string;
        hintColor?: string;
        floatingLabelColor?: string;
        disabledTextColor?: string;
        errorColor?: string;
        focusColor?: string;
        backgroundColor?: string;
        borderColor?: string;
      };
      timePicker?: {
        color?: string;
        textColor?: string;
        accentColor?: string;
        clockColor?: string;
        clockCircleColor?: string;
        headerColor?: string;
        selectColor?: string;
        selectTextColor?: string;
      };
      toggle?: {
        thumbOnColor?: string;
        thumbOffColor?: string;
        thumbDisabledColor?: string;
        thumbRequiredColor?: string;
        trackOnColor?: string;
        trackOffColor?: string;
        trackDisabledColor?: string;
        labelColor?: string;
        labelDisabledColor?: string;
        trackRequiredColor?: string;
      };
      toolbar?: {
        color?: string;
        hoverColor?: string;
        backgroundColor?: string;
        height?: number;
        titleFontSize?: number;
        iconColor?: string;
        separatorColor?: string;
        menuHoverColor?: string;
      };
      tooltip?: {
        color?: string;
        rippleBackgroundColor?: string;
      };
    }

    interface zIndex {
      menu: number;
      appBar: number;
      drawerOverlay: number;
      drawer: number;
      dialogOverlay: number;
      dialog: number;
      layer: number;
      popover: number;
      snackbar: number;
      tooltip: number;
    }

    interface RawTheme {
      spacing?: Spacing;
      fontFamily?: string;
      palette?: ThemePalette;
    }
    var lightBaseTheme: RawTheme;
    var darkBaseTheme: RawTheme;

    export function muiThemeable(): <
      TComponent extends React.ComponentClass<P> | React.StatelessComponent<P>,
      P extends { muiTheme?: MuiTheme }
      >(component: TComponent) => TComponent;

    interface MuiThemeProviderProps {
      muiTheme?: Styles.MuiTheme;
    }
    export class MuiThemeProvider extends React.Component<MuiThemeProviderProps> {
    }

    export function getMuiTheme(...muiTheme: MuiTheme[]): MuiTheme;

    interface Transitions {
      easeOut(duration?: string, property?: string | string[], delay?: string, easeFunction?: string): string;
      create(duration?: string, property?: string, delay?: string, easeFunction?: string): string;
      easeOutFunction: string;
      easeInOutFunction: string;
    }
    export var Transitions: Transitions;

    interface Typography {
      textFullBlack: string;
      textDarkBlack: string;
      textLightBlack: string;
      textMinBlack: string;
      textFullWhite: string;
      textDarkWhite: string;
      textLightWhite: string;

      // font weight
      fontWeightLight: number;
      fontWeightNormal: number;
      fontWeightMedium: number;

      fontStyleButtonFontSize: number;
    }
    export var Typography: Typography;
  }

  interface AppBarProps {
    className?: string;
    iconClassNameLeft?: string;
    iconClassNameRight?: string;
    iconElementLeft?: React.ReactElement<any>;
    iconElementRight?: React.ReactElement<any>;
    iconStyleRight?: React.CSSProperties;
    iconStyleLeft?: React.CSSProperties;
    onLeftIconButtonTouchTap?: TouchTapEventHandler;
    onRightIconButtonTouchTap?: TouchTapEventHandler;
    onTitleTouchTap?: TouchTapEventHandler;
    showMenuIconButton?: boolean;
    style?: React.CSSProperties;
    title?: React.ReactNode;
    titleStyle?: React.CSSProperties;
    zDepth?: number;
  }
  export class AppBar extends React.Component<AppBarProps> {
  }

  namespace propTypes {
    type horizontal = 'left' | 'middle' | 'right';
    type tooltipHorizontal = 'left' | 'center' | 'right';
    type vertical = 'top' | 'center' | 'bottom';
    type direction = 'left' | 'right' | 'up' | 'down';

    interface origin {
      horizontal: horizontal;
      vertical: vertical;
    }

    interface utils {
      getWeekArray: (date: Date, firstDayOfWeek: number) => (Date | null)[][];
      getYear: (date: Date) => number;
      setYear: (date: Date, year: number) => Date;
      addDays: (date: Date, days: number) => Date;
      addMonths: (date: Date, months: number) => Date;
      addYears: (date: Date, years: number) => Date;
      getFirstDayOfMonth: (date: Date) => Date;
      monthDiff: (date1: Date, date2: Date) => number;
    }

    type corners = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    type cornersAndCenter = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
  }

  interface DrawerProps {
    className?: string;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    disableSwipeToOpen?: boolean;
    docked?: boolean;
    onRequestChange?: (opening: boolean, reason: string) => void;
    open?: boolean;
    openSecondary?: Boolean;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    swipeAreaWidth?: number;
    width?: number | string;
    zDepth?: number;
  }
  export class Drawer extends React.Component<DrawerProps> {
  }

  interface LinearProgressProps {
    className?: string;
    classes?: {
      root?: string;
      rootBuffer?: string;
      rootQuery?: string;
      bar?: string;
      dashed?: string;
      indeterminateBar1?: string;
      indeterminateBar2?: string;
      determinateBar1?: string;
      bufferBar1?: string;
      bufferBar2?: string;
      '@keyframes mui-indeterminate1'?: string;
      '@keyframes mui-indeterminate2'?: string;
      '@keyframes buffer'?: string;
    }
  }

  interface LinearIndeterminateProgressProps extends LinearProgressProps {
    mode: 'query' | 'indeterminate';
  }

  interface LinearBufferProgressProps extends LinearProgressProps {
    mode: 'buffer';
    value: number;
    valueBuffer: number;
  }

  interface LinearDeterminateProgressProps extends LinearProgressProps {
    mode: 'determinate';
    value: number;
  }
  export class LinearProgress extends React.Component<LinearIndeterminateProgressProps | LinearBufferProgressProps | LinearDeterminateProgressProps> {
  }

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'default' | 'inherit' | 'primary' | 'accent' | 'contrast';
    component?: 'string' | React.ComponentType;
    dense?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    disabled?: boolean;
    fab?: boolean;
    raised?: boolean;
    href?: string;
    classes?: {
      root?: string;
      dense?: string;
      label?: string;
      flatPrimary?: string;
      flatAccent?: string;
      flatContrast?: string;
      colorInherit?: string;
      raised?: string;
      keyboardFocused?: string;
      raisedPrimary?: string;
      raisedAccent?: string;
      raisedContrast?: string;
      disabled?: string;
      fab?: string;
    }
  }

  export class Button extends React.Component<ButtonProps> {
  }

  interface PaperProps {
    component?: string | React.ComponentType;
    elevation?: number;
    square?: boolean;
    className?: string;
    classes?: {
      root?: string;
      rounded?: string;
      shadow0?: string;
      shadow1?: string;
      shadow2?: string;
      shadow3?: string;
      shadow4?: string;
      shadow5?: string;
      shadow6?: string;
      shadow7?: string;
      shadow8?: string;
      shadow9?: string;
      shadow10?: string;
      shadow11?: string;
      shadow12?: string;
      shadow13?: string;
      shadow14?: string;
      shadow15?: string;
      shadow16?: string;
      shadow17?: string;
      shadow18?: string;
      shadow19?: string;
      shadow20?: string;
      shadow21?: string;
      shadow22?: string;
      shadow23?: string;
      shadow24?: string;
    }
    children: React.ReactNode;
  }

  export class Paper extends React.Component<PaperProps> {
  }

  interface SvgIconProps extends React.SVGAttributes<SVGElement> {
    titleAccess?: string;
    viewBox?: string;
    className?: string;
    classes?: {
      root?: string;
    }
    children?: React.ReactNode;
  }

  export class SvgIcon extends React.Component<SvgIconProps> {
  }

  interface TableProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    classes?: {
      root?: string;
    }
    children: React.ReactNode;
  }

  export class Table extends React.Component<TableProps> {
  }

  interface TableHeadProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    classes?: {
      root?: string;
    }
    children: React.ReactNode;
  }

  export class TableHead extends React.Component<TableHeadProps> {
  }

  interface TableSortLabelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    direction?: 'asc' | 'desc';
    className?: string;
    classes?: {
      root?: string;
      active?: string;
      icon?: string;
      desc?: string;
      asc?: string;
    }
    children: React.ReactNode;
  }

  export class TableSortLabel extends React.Component<TableSortLabelProps> {
  }

  interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    selected?: boolean;
    hover?: boolean;
    className?: string;
    classes?: {
      root?: string;
      head?: string;
      footer?: string;
      hover?: string;
      selected?: string;
    }
    children: React.ReactNode;
  }

  export class TableRow extends React.Component<TableRowProps> {
  }

  interface TableBodyProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    classes?: {
      root?: string;
    }
    children: React.ReactNode;
  }

  export class TableBody extends React.Component<TableBodyProps> {
  }

  interface TableCellProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checkbox?: boolean;
    compact?: boolean;
    disablePadding?: boolean;
    numeric?: boolean;
    className?: string;
    classes?: {
      root?: string;
      numeric?: string;
      head?: string;
      compact?: string;
      checkbox?: string;
      footer?: string;
    }
    children: React.ReactNode;
  }

  export class TableCell extends React.Component<TableCellProps> {
  }

  interface CheckboxProps {
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    className?: string;
    classes?: {
    }
  }

  export class Checkbox extends React.Component<CheckboxProps> {
  }

  interface DialogProps {
    className?: string;
    classes?: {
      root?: string;
      paper?: string;
      paperWidthXs?: string;
      paperWidthSm?: string;
      paperWidthMd?: string;
      fullScreen?: string;
    }
    children: React.ReactNode;
    fullScreen?: boolean,
    ignoreBackdropClick?: boolean,
    ignoreEscapeKeyUp?: boolean,
    enterTransitionDuration?: number, // eslint-disable-line react/sort-prop-types
    leaveTransitionDuration?: number,
    maxWidth?: 'xs' | 'sm' | 'md',
    onBackdropClick?: () => void,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
    onEscapeKeyUp?: () => void, // eslint-disable-line react/sort-prop-types
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
    onRequestClose?: () => void,
    open?: boolean,
    transition?: () => void | React.ReactNode,
  }

  export class Dialog extends React.Component<DialogProps> {
  }

  interface DialogActionsProps {
    className?: string;
    classes?: {
      root?: string;
      action?: string;
      button?: string;
    }
    children: React.ReactNode;
  }

  export class DialogActions extends React.Component<DialogActionsProps> {
  }

  interface DialogContentProps {
    className?: string;
    classes?: {
      root?: string;
    }
    children: React.ReactNode;
  }

  export class DialogContent extends React.Component<DialogContentProps> {
  }

  interface DialogTitleProps {
    disableTypography?: boolean;
    className?: string;
    classes?: {
      root?: string;
    }
    children: React.ReactNode;
  }

  export class DialogTitle extends React.Component<DialogTitleProps> {
  }

  interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    color?: 'default' | 'inherit' | 'primary' | 'contrast' | 'accent';
    disabled?: boolean;
    disableRipple?: boolean;
    rootRef?: React.Ref<HTMLButtonElement>;
    className?: string;
    classes?: {
      root?: string;
      disabled?: string;
      colorAccent?: string;
      colorContrast?: string;
      colorPrimary?: string;
      colorInherit?: string;
      label?: string;
      icon?: string;
      keyboardFocused?: string;
    }
  }

  export class IconButton extends React.Component<IconButtonProps> {
  }

  type TransitionCallback = (element: HTMLElement) => void;

  interface ListItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    button?: boolean,
    children?: React.ReactNode,
    className?: string,
    component?: string | React.ComponentType,
    dense?: boolean,
    disabled?: boolean,
    disableGutters?: boolean,
    divider?: boolean,
    classes?: {
      root?: string;
      container?: string;
      keyboardFocused?: string;
      default?: string;
      dense?: string;
      disabled?: string;
      divider?: string;
      gutters?: string;
      button?: string;
    }
  }

  export class ListItem extends React.Component<ListItemProps> {
  }

  interface MenuProps {
    open?: boolean;
    transitionDuration?: 'auto';
    anchorEl?: EventTarget;
    MenuListProps?: MenuListProps;
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
    onRequestClose?: Function,
    className?: string;
    classes?: {
      root?: string;
    };
    children?: React.ReactNode;
  }

  export class Menu extends React.Component<MenuProps> {
  }

  interface MenuItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    classes?: {
      root?: string;
      selected?: string;
    };
    component?: string | React.ComponentType;
    role?: string;
    selected?: boolean;
  }

  export class MenuItem extends React.Component<MenuItemProps> {
  }

  interface MenuListProps {
    className?: string;
    onBlur?: string | React.ComponentType;
    onKeyDown?: (event: React.SyntheticEvent<any>, key: string) => void;
    children?: React.ReactNode;
  }

  interface ToolbarProps {
    disableGutters?: boolean;
    className?: string;
    classes?: {
      root?: string;
      gutters?: string;
    }
    children: React.ReactNode;
  }

  export class Toolbar extends React.Component<ToolbarProps> {
  }

  type Type =
    | 'display4'
    | 'display3'
    | 'display2'
    | 'display1'
    | 'headline'
    | 'title'
    | 'subheading'
    | 'body2'
    | 'body1'
    | 'caption'
    | 'button';

  type HeadlineMapping<T> = {
    [P in keyof T]?: string;
  }

  interface TypographyProps {
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    component?: string | React.ComponentType<any>;
    color?: 'inherit' | 'secondary' | 'accent' | 'default';
    gutterBottom?: boolean;
    headlineMapping?: {
      display4?: string;
      display3?: string;
      display2?: string;
      display1?: string;
      headline?: string;
      title?: string;
      subheading?: string;
      body2?: string;
      body1?: string;
      caption?: string;
      button?: string;
    };
    noWrap?: boolean;
    paragraph?: boolean;
    type?: Type;
    className?: string;
    classes?: {
      root?: string;
      display1?: string;
      display2?: string;
      display3?: string;
      display4?: string;
      headline?: string;
      title?: string;
      subheading?: string;
      caption?: string;
      body1?: string;
      body2?: string;
      button?: string;
      alignLeft?: string;
      alignCenter?: string;
      alignRight?: string;
      alignJustify?: string;
      noWrap?: string;
      gutterBottom?: string;
      paragraph?: string;
      colorInherit?: string;
      colorSecondary?: string;
      colorAccent?: string;
    }
    children: React.ReactNode;
  }

  export class Typography extends React.Component<TypographyProps> {
  }

  interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
     * @ignore
     */
    className?: string,
    /**
     * The default value of the `Input` element.
     */
    defaultValue?: string,
    /**
     * If `true`, the input will be disabled.
     */
    disabled?: boolean,
    /**
     * If `true`, the label will be displayed in an error state.
     */
    error?: boolean,
    /**
     * Properties applied to the `FormHelperText` element.
     */
    FormHelperTextProps?: Object,
    /**
     * If `true`, the input will take up the full width of its container.
     */
    fullWidth?: boolean,
    /**
     * The helper text content.
     */
    helperText?: string | React.ReactNode,
    /**
     * The CSS class name of the helper text element.
     */
    helperTextClassName?: string,
    /**
     * The id of the `input` element.
     */
    id?: string,
    /**
     * The CSS class name of the `input` element.
     */
    inputClassName?: string,
    /**
     * The CSS class name of the `Input` element.
     */
    InputClassName?: string,
    /**
     * Properties applied to the `InputLabel` element.
     */
    InputLabelProps?: Object,
    /**
     * Properties applied to the `input` element.
     */
    inputProps?: Object,
    /**
     * Properties applied to the `Input` element.
     */
    InputProps?: Object,
    /**
     * Use that property to pass a ref callback to the native input component.
     */
    inputRef?: Function,
    /**
     * The label content.
     */
    label?: string | React.ReactNode,
    /**
     * The CSS class name of the label element.
     */
    labelClassName?: string,
    /**
     * If `true`, a textarea element will be rendered instead of an input.
     */
    multiline?: boolean,
    /**
     * Name attribute of the `Input` element.
     */
    name?: string,
    placeholder?: string,
    /**
     * If `true`, the label is displayed as required.
     */
    required?: boolean,
    /**
     * Use that property to pass a ref callback to the root component.
     */
    rootRef?: Function,
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows?: string | number,
    /**
     * Maxium number of rows to display when multiline option is set to true.
     */
    rowsMax?: string | number,
    /**
     * Type attribute of the `Input` element. It should be a valid HTML5 input type.
     */
    type?: string,
    /**
     * The value of the `Input` element, required for a controlled component.
     */
    value?: string | number,
    /**
     * If `dense` | `normal`, will adjust vertical spacing of this and contained components.
     */
    margin?: 'none' | 'dense' | 'normal',
  }

  export class TextField extends React.Component<TextFieldProps> {
    blur(): void;

    focus(): void;

    select(): void;

    getValue(): string;

    getInputNode(): HTMLInputElement;
  }
}    // __MaterialUI

declare module 'material-ui/AppBar' {
  export import AppBar = __MaterialUI.AppBar;
  export default AppBar;
}

declare module 'material-ui/Progress' {
  export import LinearProgress = __MaterialUI.LinearProgress;
}

declare module 'material-ui/Button' {
  export import Button = __MaterialUI.Button;
  export default Button;
}

declare module 'material-ui/Checkbox' {
  export import Checkbox = __MaterialUI.Checkbox;
  export default Checkbox;
}

declare module 'material-ui/Dialog' {
  export import Dialog = __MaterialUI.Dialog;
  export import DialogActions = __MaterialUI.DialogActions;
  export import DialogContent = __MaterialUI.DialogContent;
  export import DialogTitle = __MaterialUI.DialogTitle;
  
  export default Dialog;
}

declare module 'material-ui/IconButton' {
  export import IconButton = __MaterialUI.IconButton;
  export default IconButton;
}

declare module 'material-ui/Menu' {
  export import Menu = __MaterialUI.Menu;
  export import MenuItem = __MaterialUI.MenuItem;
  export default Menu;
}

declare module 'material-ui/Paper' {
  export import Paper = __MaterialUI.Paper;
  export default Paper;
}

declare module 'material-ui/SvgIcon' {
  export import SvgIcon = __MaterialUI.SvgIcon;
  export import SvgIconProps = __MaterialUI.SvgIconProps;
  export default SvgIcon;
}

declare module 'material-ui/styles' {
  export import MuiThemeProvider = __MaterialUI.Styles.MuiThemeProvider;
  export function createMuiTheme(options: any): __MaterialUI.Styles.MuiTheme;
}

declare module 'material-ui/Table' {
  export import Table = __MaterialUI.Table;
  export import TableBody = __MaterialUI.TableBody;
  export import TableCell = __MaterialUI.TableCell;
  export import TableHead = __MaterialUI.TableHead;
  export import TableRow = __MaterialUI.TableRow;
  export import TableSortLabel = __MaterialUI.TableSortLabel;

  export default Table;
}

declare module 'material-ui/TextField' {
  export import TextField = __MaterialUI.TextField;
  export default TextField;
}

declare module 'material-ui/Toolbar' {
  export import Toolbar = __MaterialUI.Toolbar;
  export default Toolbar;
}

declare module 'material-ui/Typography' {
  export import Typography = __MaterialUI.Typography;
  export default Typography;
}

declare module "material-ui/styles/colors" {
  export const red50: string;
  export const red100: string;
  export const red200: string;
  export const red300: string;
  export const red400: string;
  export const red500: string;
  export const red600: string;
  export const red700: string;
  export const red800: string;
  export const red900: string;
  export const redA100: string;
  export const redA200: string;
  export const redA400: string;
  export const redA700: string;

  export const pink50: string;
  export const pink100: string;
  export const pink200: string;
  export const pink300: string;
  export const pink400: string;
  export const pink500: string;
  export const pink600: string;
  export const pink700: string;
  export const pink800: string;
  export const pink900: string;
  export const pinkA100: string;
  export const pinkA200: string;
  export const pinkA400: string;
  export const pinkA700: string;

  export const purple50: string;
  export const purple100: string;
  export const purple200: string;
  export const purple300: string;
  export const purple400: string;
  export const purple500: string;
  export const purple600: string;
  export const purple700: string;
  export const purple800: string;
  export const purple900: string;
  export const purpleA100: string;
  export const purpleA200: string;
  export const purpleA400: string;
  export const purpleA700: string;

  export const deepPurple50: string;
  export const deepPurple100: string;
  export const deepPurple200: string;
  export const deepPurple300: string;
  export const deepPurple400: string;
  export const deepPurple500: string;
  export const deepPurple600: string;
  export const deepPurple700: string;
  export const deepPurple800: string;
  export const deepPurple900: string;
  export const deepPurpleA100: string;
  export const deepPurpleA200: string;
  export const deepPurpleA400: string;
  export const deepPurpleA700: string;

  export const indigo50: string;
  export const indigo100: string;
  export const indigo200: string;
  export const indigo300: string;
  export const indigo400: string;
  export const indigo500: string;
  export const indigo600: string;
  export const indigo700: string;
  export const indigo800: string;
  export const indigo900: string;
  export const indigoA100: string;
  export const indigoA200: string;
  export const indigoA400: string;
  export const indigoA700: string;

  export const blue50: string;
  export const blue100: string;
  export const blue200: string;
  export const blue300: string;
  export const blue400: string;
  export const blue500: string;
  export const blue600: string;
  export const blue700: string;
  export const blue800: string;
  export const blue900: string;
  export const blueA100: string;
  export const blueA200: string;
  export const blueA400: string;
  export const blueA700: string;

  export const lightBlue50: string;
  export const lightBlue100: string;
  export const lightBlue200: string;
  export const lightBlue300: string;
  export const lightBlue400: string;
  export const lightBlue500: string;
  export const lightBlue600: string;
  export const lightBlue700: string;
  export const lightBlue800: string;
  export const lightBlue900: string;
  export const lightBlueA100: string;
  export const lightBlueA200: string;
  export const lightBlueA400: string;
  export const lightBlueA700: string;

  export const cyan50: string;
  export const cyan100: string;
  export const cyan200: string;
  export const cyan300: string;
  export const cyan400: string;
  export const cyan500: string;
  export const cyan600: string;
  export const cyan700: string;
  export const cyan800: string;
  export const cyan900: string;
  export const cyanA100: string;
  export const cyanA200: string;
  export const cyanA400: string;
  export const cyanA700: string;

  export const teal50: string;
  export const teal100: string;
  export const teal200: string;
  export const teal300: string;
  export const teal400: string;
  export const teal500: string;
  export const teal600: string;
  export const teal700: string;
  export const teal800: string;
  export const teal900: string;
  export const tealA100: string;
  export const tealA200: string;
  export const tealA400: string;
  export const tealA700: string;

  export const green50: string;
  export const green100: string;
  export const green200: string;
  export const green300: string;
  export const green400: string;
  export const green500: string;
  export const green600: string;
  export const green700: string;
  export const green800: string;
  export const green900: string;
  export const greenA100: string;
  export const greenA200: string;
  export const greenA400: string;
  export const greenA700: string;

  export const lightGreen50: string;
  export const lightGreen100: string;
  export const lightGreen200: string;
  export const lightGreen300: string;
  export const lightGreen400: string;
  export const lightGreen500: string;
  export const lightGreen600: string;
  export const lightGreen700: string;
  export const lightGreen800: string;
  export const lightGreen900: string;
  export const lightGreenA100: string;
  export const lightGreenA200: string;
  export const lightGreenA400: string;
  export const lightGreenA700: string;

  export const lime50: string;
  export const lime100: string;
  export const lime200: string;
  export const lime300: string;
  export const lime400: string;
  export const lime500: string;
  export const lime600: string;
  export const lime700: string;
  export const lime800: string;
  export const lime900: string;
  export const limeA100: string;
  export const limeA200: string;
  export const limeA400: string;
  export const limeA700: string;

  export const yellow50: string;
  export const yellow100: string;
  export const yellow200: string;
  export const yellow300: string;
  export const yellow400: string;
  export const yellow500: string;
  export const yellow600: string;
  export const yellow700: string;
  export const yellow800: string;
  export const yellow900: string;
  export const yellowA100: string;
  export const yellowA200: string;
  export const yellowA400: string;
  export const yellowA700: string;

  export const amber50: string;
  export const amber100: string;
  export const amber200: string;
  export const amber300: string;
  export const amber400: string;
  export const amber500: string;
  export const amber600: string;
  export const amber700: string;
  export const amber800: string;
  export const amber900: string;
  export const amberA100: string;
  export const amberA200: string;
  export const amberA400: string;
  export const amberA700: string;

  export const orange50: string;
  export const orange100: string;
  export const orange200: string;
  export const orange300: string;
  export const orange400: string;
  export const orange500: string;
  export const orange600: string;
  export const orange700: string;
  export const orange800: string;
  export const orange900: string;
  export const orangeA100: string;
  export const orangeA200: string;
  export const orangeA400: string;
  export const orangeA700: string;

  export const deepOrange50: string;
  export const deepOrange100: string;
  export const deepOrange200: string;
  export const deepOrange300: string;
  export const deepOrange400: string;
  export const deepOrange500: string;
  export const deepOrange600: string;
  export const deepOrange700: string;
  export const deepOrange800: string;
  export const deepOrange900: string;
  export const deepOrangeA100: string;
  export const deepOrangeA200: string;
  export const deepOrangeA400: string;
  export const deepOrangeA700: string;

  export const brown50: string;
  export const brown100: string;
  export const brown200: string;
  export const brown300: string;
  export const brown400: string;
  export const brown500: string;
  export const brown600: string;
  export const brown700: string;
  export const brown800: string;
  export const brown900: string;

  export const blueGrey50: string;
  export const blueGrey100: string;
  export const blueGrey200: string;
  export const blueGrey300: string;
  export const blueGrey400: string;
  export const blueGrey500: string;
  export const blueGrey600: string;
  export const blueGrey700: string;
  export const blueGrey800: string;
  export const blueGrey900: string;

  export const grey50: string;
  export const grey100: string;
  export const grey200: string;
  export const grey300: string;
  export const grey400: string;
  export const grey500: string;
  export const grey600: string;
  export const grey700: string;
  export const grey800: string;
  export const grey900: string;

  export const black: string;
  export const white: string;

  export const transparent: string;
  export const fullBlack: string;
  export const darkBlack: string;
  export const lightBlack: string;
  export const minBlack: string;
  export const faintBlack: string;
  export const fullWhite: string;
  export const darkWhite: string;
  export const lightWhite: string;
}

declare namespace __MaterialUI.Styles {
  interface Colors {
    red50: string;
    red100: string;
    red200: string;
    red300: string;
    red400: string;
    red500: string;
    red600: string;
    red700: string;
    red800: string;
    red900: string;
    redA100: string;
    redA200: string;
    redA400: string;
    redA700: string;

    pink50: string;
    pink100: string;
    pink200: string;
    pink300: string;
    pink400: string;
    pink500: string;
    pink600: string;
    pink700: string;
    pink800: string;
    pink900: string;
    pinkA100: string;
    pinkA200: string;
    pinkA400: string;
    pinkA700: string;

    purple50: string;
    purple100: string;
    purple200: string;
    purple300: string;
    purple400: string;
    purple500: string;
    purple600: string;
    purple700: string;
    purple800: string;
    purple900: string;
    purpleA100: string;
    purpleA200: string;
    purpleA400: string;
    purpleA700: string;

    deepPurple50: string;
    deepPurple100: string;
    deepPurple200: string;
    deepPurple300: string;
    deepPurple400: string;
    deepPurple500: string;
    deepPurple600: string;
    deepPurple700: string;
    deepPurple800: string;
    deepPurple900: string;
    deepPurpleA100: string;
    deepPurpleA200: string;
    deepPurpleA400: string;
    deepPurpleA700: string;

    indigo50: string;
    indigo100: string;
    indigo200: string;
    indigo300: string;
    indigo400: string;
    indigo500: string;
    indigo600: string;
    indigo700: string;
    indigo800: string;
    indigo900: string;
    indigoA100: string;
    indigoA200: string;
    indigoA400: string;
    indigoA700: string;

    blue50: string;
    blue100: string;
    blue200: string;
    blue300: string;
    blue400: string;
    blue500: string;
    blue600: string;
    blue700: string;
    blue800: string;
    blue900: string;
    blueA100: string;
    blueA200: string;
    blueA400: string;
    blueA700: string;

    lightBlue50: string;
    lightBlue100: string;
    lightBlue200: string;
    lightBlue300: string;
    lightBlue400: string;
    lightBlue500: string;
    lightBlue600: string;
    lightBlue700: string;
    lightBlue800: string;
    lightBlue900: string;
    lightBlueA100: string;
    lightBlueA200: string;
    lightBlueA400: string;
    lightBlueA700: string;

    cyan50: string;
    cyan100: string;
    cyan200: string;
    cyan300: string;
    cyan400: string;
    cyan500: string;
    cyan600: string;
    cyan700: string;
    cyan800: string;
    cyan900: string;
    cyanA100: string;
    cyanA200: string;
    cyanA400: string;
    cyanA700: string;

    teal50: string;
    teal100: string;
    teal200: string;
    teal300: string;
    teal400: string;
    teal500: string;
    teal600: string;
    teal700: string;
    teal800: string;
    teal900: string;
    tealA100: string;
    tealA200: string;
    tealA400: string;
    tealA700: string;

    green50: string;
    green100: string;
    green200: string;
    green300: string;
    green400: string;
    green500: string;
    green600: string;
    green700: string;
    green800: string;
    green900: string;
    greenA100: string;
    greenA200: string;
    greenA400: string;
    greenA700: string;

    lightGreen50: string;
    lightGreen100: string;
    lightGreen200: string;
    lightGreen300: string;
    lightGreen400: string;
    lightGreen500: string;
    lightGreen600: string;
    lightGreen700: string;
    lightGreen800: string;
    lightGreen900: string;
    lightGreenA100: string;
    lightGreenA200: string;
    lightGreenA400: string;
    lightGreenA700: string;

    lime50: string;
    lime100: string;
    lime200: string;
    lime300: string;
    lime400: string;
    lime500: string;
    lime600: string;
    lime700: string;
    lime800: string;
    lime900: string;
    limeA100: string;
    limeA200: string;
    limeA400: string;
    limeA700: string;

    yellow50: string;
    yellow100: string;
    yellow200: string;
    yellow300: string;
    yellow400: string;
    yellow500: string;
    yellow600: string;
    yellow700: string;
    yellow800: string;
    yellow900: string;
    yellowA100: string;
    yellowA200: string;
    yellowA400: string;
    yellowA700: string;

    amber50: string;
    amber100: string;
    amber200: string;
    amber300: string;
    amber400: string;
    amber500: string;
    amber600: string;
    amber700: string;
    amber800: string;
    amber900: string;
    amberA100: string;
    amberA200: string;
    amberA400: string;
    amberA700: string;

    orange50: string;
    orange100: string;
    orange200: string;
    orange300: string;
    orange400: string;
    orange500: string;
    orange600: string;
    orange700: string;
    orange800: string;
    orange900: string;
    orangeA100: string;
    orangeA200: string;
    orangeA400: string;
    orangeA700: string;

    deepOrange50: string;
    deepOrange100: string;
    deepOrange200: string;
    deepOrange300: string;
    deepOrange400: string;
    deepOrange500: string;
    deepOrange600: string;
    deepOrange700: string;
    deepOrange800: string;
    deepOrange900: string;
    deepOrangeA100: string;
    deepOrangeA200: string;
    deepOrangeA400: string;
    deepOrangeA700: string;

    brown50: string;
    brown100: string;
    brown200: string;
    brown300: string;
    brown400: string;
    brown500: string;
    brown600: string;
    brown700: string;
    brown800: string;
    brown900: string;

    blueGrey50: string;
    blueGrey100: string;
    blueGrey200: string;
    blueGrey300: string;
    blueGrey400: string;
    blueGrey500: string;
    blueGrey600: string;
    blueGrey700: string;
    blueGrey800: string;
    blueGrey900: string;

    grey50: string;
    grey100: string;
    grey200: string;
    grey300: string;
    grey400: string;
    grey500: string;
    grey600: string;
    grey700: string;
    grey800: string;
    grey900: string;

    black: string;
    white: string;

    transparent: string;
    fullBlack: string;
    darkBlack: string;
    lightBlack: string;
    minBlack: string;
    faintBlack: string;
    fullWhite: string;
    darkWhite: string;
    lightWhite: string;
  }
  export var Colors: Colors;
}

declare namespace __MaterialUIIcons {
  interface IconProps {
  }

  export class Icon extends React.Component<IconProps> {
  }
}

declare module 'material-ui-icons/FilterList' {
  export import SvgIcon = __MaterialUI.SvgIcon;
  export default SvgIcon;
}

declare module 'material-ui-icons/Delete' {
  export import SvgIcon = __MaterialUI.SvgIcon;
  export default SvgIcon;
}
declare module 'material-ui-icons/MoreVert' {
  export import SvgIcon = __MaterialUI.SvgIcon;
  export default SvgIcon;
}
declare module 'material-ui-icons/Add' {
  export import SvgIcon = __MaterialUI.SvgIcon;
  export default SvgIcon;
}
declare module 'material-ui-icons/AddBox' {
  export import SvgIcon = __MaterialUI.SvgIcon;
  export default SvgIcon;
}
declare module 'material-ui-icons/AddCircle' {
  export import SvgIcon = __MaterialUI.SvgIcon;
  export default SvgIcon;
}
declare module 'material-ui-icons/AddCircleOutline' {
  export import SvgIcon = __MaterialUI.SvgIcon;
  export default SvgIcon;
}
