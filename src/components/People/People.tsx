import * as React from 'react';

import { PrivateRoute } from '../PrivateRoute';

import { Add } from './Add';
import { List } from './List';

export const People = () => (
  <div>
    <PrivateRoute path="/members/add" component={Add} exact={true} />
    <PrivateRoute path="/members" component={List} exact={false} />
  </div>
);