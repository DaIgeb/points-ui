type ConfigureStore = { default: object };

let configureStore;
if (process.env.NODE_ENV === 'production') {
  configureStore = require<ConfigureStore>('./configureStore.prod').default;
} else {
  configureStore = require<ConfigureStore>('./configureStore.dev').default;
}

export default configureStore;
