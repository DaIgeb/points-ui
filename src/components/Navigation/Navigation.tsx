import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';

import { IconLabel } from '../';

const styles = require<{ navigation: string, selected: string }>('./Navigation.css');

export const Navigation = connect(null, { push })((props: { push: (uri: string) => void }) => (
  <div className={styles.navigation}>
    <div className="menu">
      <NavLink activeClassName={styles.selected} to="/tours">
        <IconLabel iconName="directions" fixedWith={true} label="Touren" />
      </NavLink>
    </div>
    <div className="menu">
      <NavLink activeClassName={styles.selected} to="/members">
        <IconLabel iconName="group" fixedWith={true} label="Fahrer" />
      </NavLink>
    </div>
  </div>
));
