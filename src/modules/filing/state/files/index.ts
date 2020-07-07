import { INIT, CLEAR, ERROR, STORE } from './actions';

import { ReducerInterface } from './interface';

export function reducer(state: ReducerInterface = null, action: any) {
  switch (action.type) {
    case INIT: {
      return null;
    }

    case STORE: {
      if (action.result) {
        return Object.assign({}, action.result);
      } else {
        return null;
      }
    }

    case ERROR: {
      return Object.assign({}, action.result);
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
