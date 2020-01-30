import { INIT, CLEAR, LOGIN, LOGOUT, LOCALSTORAGE, STORE } from './actions';

import { ReducerInterface } from './interface';

export function reducer(state: ReducerInterface = null, action: any) {
  switch (action.type) {

    case INIT: {
      return state;
    }

    case STORE: {
      if (action.result && Object.keys(action.result).length > 0) {
        state = Object.assign({}, action.result);
      } else {
        state = null;
      }
      return state;
    }

    case CLEAR: {
      state = null;
      return state;
    }

    case LOGIN: {
      return state;
    }

    case LOGOUT: {
      return state;
    }

    case LOCALSTORAGE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
