import * as React from 'react';

type TStyle = {
  md12: string;
  md18: string;
  md24: string;
  md36: string;
  md48: string;
  fixedWith: string;
  icon: string;
};
const styles = require<TStyle>('./FontIcon.css');

export type FontSize = 'md-12' | 'md-18' | 'md-24' | 'md-36' | 'md-48' | 'default';

const fontSizeClassName = (size: FontSize): string => {
  switch (size) {
    case 'md-12':
      return styles.md12;
    case 'md-18':
      return styles.md18;
    case 'md-36':
      return styles.md36;
    case 'md-48':
      return styles.md48;
    case 'md-24':
    default:
      return styles.md24;
  }
};

const fixedWithClassName = (fixedWith: boolean): string => fixedWith ? styles.fixedWith : '';

// <span className={`fa ${props.iconName} ${fontSizeClassName(props.size || 'default')} ${styles.icon}`} />
export const FontIcon = (props: { iconName: string; size?: FontSize; fixedWith?: boolean }) => {
  const classNames = [
    styles.icon,
    'material-icons',
    fontSizeClassName(props.size || 'default'),
    fixedWithClassName(props.fixedWith || false)
  ];
  return (
    <i className={classNames.join(' ')}>
      {props.iconName}
    </i>
  );
};