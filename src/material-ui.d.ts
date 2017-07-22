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

  interface TextFieldProps {
    className?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    errorStyle?: React.CSSProperties;
    errorText?: React.ReactNode;
    floatingLabelFixed?: boolean;
    floatingLabelFocusStyle?: React.CSSProperties;
    floatingLabelShrinkStyle?: React.CSSProperties;
    floatingLabelStyle?: React.CSSProperties;
    floatingLabelText?: React.ReactNode;
    fullWidth?: boolean;
    hintStyle?: React.CSSProperties;
    hintText?: React.ReactNode;
    id?: string;
    inputStyle?: React.CSSProperties;
    multiLine?: boolean;
    name?: string;
    onBlur?: React.FocusEventHandler<{}>;
    onChange?: (e: React.FormEvent<{}>, newValue: string) => void;
    onFocus?: React.FocusEventHandler<{}>;
    onKeyDown?: React.KeyboardEventHandler<{}>;
    onKeyUp?: React.KeyboardEventHandler<{}>;
    onKeyPress?: React.KeyboardEventHandler<{}>;
    required?: boolean;
    rows?: number,
    rowsMax?: number,
    style?: React.CSSProperties;
    textareaStyle?: React.CSSProperties;
    type?: string;
    underlineDisabledStyle?: React.CSSProperties;
    underlineFocusStyle?: React.CSSProperties;
    underlineShow?: boolean;
    underlineStyle?: React.CSSProperties;
    value?: string | number;
    autoFocus?: boolean;
    min?: number;
    max?: number;
    step?: number;
    autoComplete?: string;
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

declare module 'material-ui/styles' {
  export import MuiThemeProvider = __MaterialUI.Styles.MuiThemeProvider;
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

declare module 'material-ui/TextField' {
  export import TextField = __MaterialUI.TextField;
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