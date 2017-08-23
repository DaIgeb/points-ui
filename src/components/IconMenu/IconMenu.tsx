import * as React from 'react';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import { MenuItem } from 'material-ui/Menu';

type TState = {
  anchorEl: HTMLElement | undefined;
  open: boolean;
};

type TProps = {
  label: string;
  iconNode: React.ReactNode;
  menuItems: {
    label: string;
    onClick: () => void;
  }[];
};

export class IconMenu extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      anchorEl: undefined,
      open: false
    };
  }

  render() {
    const { label, iconNode, menuItems } = this.props;
    return (
      <div>
        <IconButton aria-label={label} onClick={this.handleClick}>
          {iconNode}
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {menuItems.map((item, idx) => (
            <MenuItem key={idx} onClick={() => this.handleRequestClose(item.onClick)}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  private handleRequestClose = (onClick: () => void) => {
    this.setState({ open: false });
    onClick();
  }
}