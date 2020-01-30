import { INIT, ADD, REMOVE, LOCALSTORAGE, STORE } from './actions';

import { ReducerInterface } from './interface';

export function reducer(state: ReducerInterface = null, action: any) {
  switch (action.type) {

    case INIT: {
      return state;
    }

    case STORE: {
      if (action.result) {
        return [].concat(action.result);
      } else {
        return null;
      }
    }

    case ADD: {
      return state;
    }

    case REMOVE: {
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
