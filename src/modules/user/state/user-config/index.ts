import { INIT, CLEAR, LOCALSTORAGE, STORE } from './actions';

import { ReducerInterface } from './interface';

export function reducer(state: ReducerInterface = null, action: any) {
  switch (action.type) {

    case INIT: {
      return state;
    }

    case STORE: {
      state = Object.assign({}, action.result);
      return state;
    }

    case CLEAR: {
      state = null;
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
