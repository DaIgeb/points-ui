import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { PrivateRoute } from '../PrivateRoute';

import { Add } from './Add';
import { Edit } from './Edit';
import { List } from './List';

export const Tours = () => (
  <div>
    <PrivateRoute path="/tours/add" component={Add} exact={true} />
    <PrivateRoute
      path="/tours/:id"
      render={(props: RouteComponentProps<{ id: string }>) => <Edit id={props.match.params.id} />}
      exact={true}
    />
    <PrivateRoute path="/tours" component={List} exact={false} />
  </div>
);