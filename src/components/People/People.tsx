import * as React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from '../PrivateRoute';

import { Add } from './Add';
import { List } from './List';

export const People = () => (
  <Switch>
    <PrivateRoute path="/members/add" component={Add} />
    <PrivateRoute path="/members" component={List} />
  </Switch>
);