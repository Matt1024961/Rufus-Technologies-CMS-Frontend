import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { INIT, STORE } from '@modules/filing/state/view-filters/actions';

@Injectable()
export class Effects {
  constructor(private actions: Actions) {}
  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    map((action: any) => {
      return {
        type: STORE,
        result: action.result,
      };
    })
  );
}
