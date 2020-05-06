import { INIT, UPDATE, CLEAR, STORE } from './actions';

import { ReducerInterface } from './interface';

export function reducer(state: ReducerInterface = null, action: any) {
  switch (action.type) {
    case INIT: {
      return state;
    }

    case UPDATE: {
      return state;
    }

    case STORE: {
      if (action.result) {
        return Object.assign({}, action.result[0]);
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