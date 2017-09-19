import * as React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import { PrivateRoute } from '../PrivateRoute';

import { Add } from './Add';
import { Edit } from './Edit';
import { List } from './List';

export const Tours = () => (
  <div>
    <Switch>
      <PrivateRoute path="/tours/add" component={Add} exact={true} />
      <PrivateRoute
        path="/tours/:id"
        render={(props: RouteComponentProps<{ id: string }>) => <Edit id={props.match.params.id} />}
        exact={true}
      />
    </Switch>
    <PrivateRoute path="/tours" component={List} exact={false} />
  </div>
);