import * as React from 'react';
import { connect } from 'react-redux';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

type TOwnProps = {
  label: string;
  value?: string;
  items: { key: string; caption: string; }[];
  onChange: (selectedItem: string) => void;
};
type TStateProps = {
};
type TDispatchProps = {
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

type TComponentState = { anchorEl: HTMLElement | undefined, open: boolean };

class LookupComponent extends React.Component<TProps, TComponentState> {
  constructor() {
    super();

    this.state = {
      anchorEl: undefined,
      open: false
    };
  }

  render() {
    const { items, value, label } = this.props;

    return (
      <div>
        <List>
          <ListItem
            button={true}
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={label}
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={label}
              secondary={items.filter(r => r.key === value).map(r => r.caption).join()}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {items.map((route) =>
            <MenuItem
              key={route.key}
              selected={route.key === value}
              onClick={() => this.handleMenuItemClick(route.key)}
            >
              {route.caption}
            </MenuItem>,
          )}
        </Menu>
      </div >
    );
  }

  private handleClickListItem = (event: React.MouseEvent<HTMLLIElement>) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  private handleMenuItemClick = (index: string) => {
    this.setState({ open: false });
    const { onChange } = this.props;

    onChange(index);
  }

  private handleRequestClose = () => {
    this.setState({ open: false });
  }
}

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
});

export const Lookup = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {}
)(LookupComponent);