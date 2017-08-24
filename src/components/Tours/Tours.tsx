import * as React from 'react';

import { PrivateRoute } from '../PrivateRoute';

import { Add } from './Add';
import { List } from './List';

export const Tours = () => (
  <div>
    <PrivateRoute path="/tours/add" component={Add} exact={true} />
    <PrivateRoute path="/tours" component={List} exact={false} />
  </div>
);