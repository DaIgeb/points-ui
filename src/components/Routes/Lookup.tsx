import * as React from 'react';
import { connect } from 'react-redux';

import { LinearProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

const styles = require<{
  title: string;
  content: string;
  add: string;
  container: string;
}>('./Routes.css');

type TOwnProps = {};
type TStateProps = {
  routes: TRoute[];
  loaded: boolean;
};
type TDispatchProps = {
  reload: () => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;

// const styles = require<{ 'table-header-cell': string, numeric: string }>('./Tours.css');

type TComponentState = { selectedIndex: string | undefined; anchorEl: HTMLElement | undefined, open: boolean };

class ListComponent extends React.Component<TProps, TComponentState> {
  constructor() {
    super();

    this.state = {
      anchorEl: undefined,
      open: false,
      selectedIndex: undefined,
    };
  }
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  handleClickListItem = (event: any) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleMenuItemClick = (event: any, index: string) => {
    this.setState({ selectedIndex: index, open: false });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { routes, loaded } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <div className={styles.container}>
        <List>
          <ListItem
            button={true}
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Strecke"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Strecke"
              secondary={routes.filter(r => r.id === this.state.selectedIndex).map(r => r.name).join()}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {routes.map((route) =>
            <MenuItem
              key={route.id}
              selected={route.id === this.state.selectedIndex}
              onClick={(event: any) => this.handleMenuItemClick(event, route.id)}
            >
              {route.name}
            </MenuItem>,
          )}
        </Menu>
      </div >
    );
  }

  private initialize = (props: TProps) => {
    const { loaded, reload } = props;
    if (!loaded) {
      reload();
    }
  }
}

const mapStateToProps = (state: TState, ownProps: TOwnProps): TStateProps => ({
  routes: fromReducers.getRoutes(state),
  loaded: fromReducers.areRoutesLoaded(state)
});

export const Lookup = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.routes.reload
  }
)(ListComponent);