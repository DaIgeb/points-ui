import * as React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';

import { IconLabel } from '../';

const styles = require<{ navigation: string, selected: string }>('./Navigation.css');

type TProps = RouteComponentProps<void>;

export const Navigation = withRouter<{}>((props: TProps) => (
  <div className={styles.navigation}>
    <div className="menu">
      <NavLink activeClassName={styles.selected} to="/tours">
        <IconLabel iconName="event" fixedWith={true} label="Touren" />
      </NavLink>
    </div>
    <div className="menu">
      <NavLink activeClassName={styles.selected} to="/members">
        <IconLabel iconName="group" fixedWith={true} label="Fahrer" />
      </NavLink>
    </div>
    <div className="menu">
      <NavLink activeClassName={styles.selected} to="/routes">
        <IconLabel iconName="directions" fixedWith={true} label="Strecken" />
      </NavLink>
    </div>
    <div className="menu">
      <NavLink activeClassName={styles.selected} to="/reports/year">
        <IconLabel iconName="show_chart" fixedWith={true} label="Reports" />
      </NavLink>
    </div>
    <div className="menu">
      <NavLink activeClassName={styles.selected} to="/reports/tour">
        <IconLabel iconName="show_chart" fixedWith={true} label="Tour-Reports" />
      </NavLink>
    </div>
  </div>
));
