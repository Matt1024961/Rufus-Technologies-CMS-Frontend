import { STORE } from './actions';

import { ReducerInterface } from './interface';

export function reducer(state: ReducerInterface = null, action: any) {
  switch (action.type) {

    case STORE: {
      if (action.result && Object.keys(action.result).length > 0) {
        state = Object.assign({}, action.result);
      } else {
        state = null;
      }
      return state;
    }

    default: {
      return state;
    }
  }
}
