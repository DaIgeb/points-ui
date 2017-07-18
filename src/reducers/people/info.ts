import { combineReducers } from 'redux';

const loadedReducer = (state: boolean = false, action: TActions) => {
  switch (action.type) {
    case 'PERSON_LOAD':
    case 'PERSON_LOAD_FAILURE':
      return false;
    case 'PERSON_LOAD_SUCCESS':
      return true;
    default:
      return state;
  }
};

const loadingReducer = (state: boolean = false, action: TActions) => {
  switch (action.type) {
    case 'PERSON_LOAD':
      return true;
    case 'PERSON_LOAD_SUCCESS':
    case 'PERSON_LOAD_FAILURE':
      return false;
    default:
      return state;
  }
};

export const reducer = combineReducers<TInfoState>({
  loaded: loadedReducer,
  loading: loadingReducer
});

export const isLoading = (state: TInfoState) => state.loading;
export const areLoaded = (state: TInfoState) => state.loaded;
