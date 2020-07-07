import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';

import {
  INIT,
  STORE,
  ERROR,
  CLEAR,
  UPDATE,
} from '@modules/filing/state/view/actions';
import { INIT as INIT_FILTERS } from '@modules/filing/state/view-filters/actions';

import { RestfulService } from '@modules/filing/services/restful/restful.service';
import { of, concat } from 'rxjs';

@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private restfulService: RestfulService
  ) {}
  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    switchMap((action: any) => {
      return this.restfulService
        .getFiling(action.result.id, action.result.params)
        .pipe(
          map((results: any) => {
            return {
              type: STORE,
              result: results,
            };
          })
        );
    }),
    catchError((error) => {
      return of({ type: ERROR, result: { type: 'ERROR', message: error } });
    })
  );

  @Effect({ dispatch: true })
  updateAction = this.actions.pipe(
    ofType(UPDATE),
    concatMap((action) => {
      return concat(
        of({ type: CLEAR }),
        of({ type: INIT_FILTERS, result: action['result'] }),
        of({ type: INIT, result: action['result'] })
      );
    })
  );
}
