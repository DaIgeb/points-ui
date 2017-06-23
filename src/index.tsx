import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import registerServiceWorker from './registerServiceWorker';

import { makeMainRoutes } from './route';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
registerServiceWorker();
