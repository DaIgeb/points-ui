import { Store } from 'redux';

// tslint:disable-next-line
type ConfigureStore = { default: (preloadedState: Partial<TState>) => Store<any> };

// tslint:disable-next-line
let configureStore: (preloadedState: Partial<TState>) => Store<any>;
if (process.env.NODE_ENV === 'production') {
  configureStore = require<ConfigureStore>('./configureStore.prod').default;
} else {
  configureStore = require<ConfigureStore>('./configureStore.dev').default;
}

export default configureStore;
