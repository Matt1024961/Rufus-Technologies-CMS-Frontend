import { INIT, UPDATE, CHANGE_LEVEL, CLEAR, ERROR, STORE } from './actions';

import { ReducerInterface } from './interface';

export function reducer(state: ReducerInterface = null, action: any) {
  switch (action.type) {
    case INIT: {
      return state;
    }

    case UPDATE: {
      return state;
    }

    case CHANGE_LEVEL: {
      return state;
    }

    case ERROR: {
      return Object.assign({}, action.result);
    }

    case STORE: {
      if (action.result) {
        return [].concat(action.result);
      } else {
        return null;
      }
    }

    case CLEAR: {
      state = null;
      return state;
    }

    default: {
      return state;
    }
  }
}
