import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap } from 'rxjs/operators';

import {
  INIT,
  UPDATE,
  CHANGE_LEVEL,
  CLEAR,
  STORE,
} from '@modules/dashboard/state/overview/actions';

import { RestfulService } from '@modules/dashboard/services/restful/restful.service';
import { concat, of } from 'rxjs';

@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private restfulService: RestfulService
  ) {}

  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    mergeMap((action: any) =>
      this.restfulService.getOverview().pipe(
        map((results: any) => {
          return {
            type: STORE,
            result: results,
          };
        })
      )
    )
  );

  @Effect({ dispatch: true })
  changeLevelAction = this.actions.pipe(
    ofType(CHANGE_LEVEL),
    concatMap((action: any) => {
      return concat(
        of({ type: CLEAR }),
        this.restfulService.getOverview(action.result).pipe(
          map((results: any) => {
            return {
              type: STORE,
              result: results,
            };
          })
        )
      );
    })
  );

  @Effect({ dispatch: true })
  updateAction = this.actions.pipe(
    ofType(UPDATE),
    concatMap((action) => concat(of({ type: CLEAR }), of({ type: INIT })))
  );
}
