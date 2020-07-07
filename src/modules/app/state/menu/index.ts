import { STORE_MAIN, STORE_USER } from './actions';

import { ReducerInterface } from './interface';

export function reducer(
  state: ReducerInterface = { main_menu: false, user_menu: false },
  action: any
) {
  switch (action.type) {
    case STORE_MAIN: {
      state.main_menu = !state.main_menu;
      return state;
    }

    case STORE_USER: {
      state.user_menu = !state.user_menu;
      return state;
    }
    default: {
      return state;
    }
  }
}
