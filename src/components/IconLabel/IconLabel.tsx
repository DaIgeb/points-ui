import * as React from 'react';

import { FontIcon, FontSize } from '../FontIcon';

const styles = require<{ small: string, double: string, iconLabel: string }>('./IconLabel.css');

const fontSizeClassName = (size: FontSize): string => {
  switch (size) {
    case 'md-12':
      return styles.small;
    case 'md-24':
      return styles.double;
    default:
      return '';
  }
};

export const IconLabel = (props: { label: string; iconName: string; size?: FontSize; fixedWith?: boolean }) => {
  const classNames = [
    styles.iconLabel,
    fontSizeClassName(props.size || 'default')
  ];
  return (
    <div className={classNames.join(' ')} >
      <FontIcon iconName={props.iconName} size={props.size} fixedWith={props.fixedWith} />
      {props.label}
    </div>
  );
};