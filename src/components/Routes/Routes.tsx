import * as React from 'react';

import { PrivateRoute } from '../PrivateRoute';

import { Add } from './Add';
import { List } from './List';

export const Routes = () => (
  <div>
    <PrivateRoute path="/routes/add" component={Add} exact={true} />
    <PrivateRoute path="/routes" component={List} exact={false} />
  </div>
);