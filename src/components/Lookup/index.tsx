import * as React from 'react';
import { connect } from 'react-redux';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

type TOwnProps = {
  label: string;
  multiple: boolean;
  values: string[];
  items: { key: string; caption: string; }[];
  onChange: (selectedItems: string[]) => void;
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
    const { items, values, label } = this.props;

    const selectedItems = values || [];

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
              secondary={items.filter(r => selectedItems.indexOf(r.key) !== -1).map(r => r.caption).join()}
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
              selected={selectedItems.indexOf(route.key) !== -1}
              onClick={() => this.handleMenuItemClick(route.key)}
            >
              {route.caption}
            </MenuItem>,
          )}
        </Menu>
      </div >
    );
  }

  // tslint:disable-next-line
  private handleClickListItem = (event: React.MouseEvent<any>) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  private handleMenuItemClick = (index: string) => {
    const { onChange, values, multiple } = this.props;

    if (!multiple) {
      this.setState({ open: false });

      if (!values) {
        onChange([index]);
      } else {
        if (values.indexOf(index) === -1) {
          onChange([index]);
        } else {
          onChange([]);
        }
      }
    } else {

      if (!values) {
        onChange([index]);
      } else {
        if (values.indexOf(index) === -1) {
          onChange([...values, index]);
        } else {
          onChange(values.filter(v => v !== index));
        }
      }
    }
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