import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap, withLatestFrom } from 'rxjs/operators';

import {
  INIT,
  ADDITIONAL_VIEW,
  UPDATE,
  CLEAR,
  STORE,
} from '@modules/filing/state/datatable/actions';

import { RestfulService } from '@modules/filing/services/restful/restful.service';
import { concat, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';

@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private restfulService: RestfulService,
    private store: Store<ModuleInterface>
  ) {}

  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    mergeMap((action: any) =>
      this.restfulService.getDatatable(action.result).pipe(
        map((results: any) => {
          console.log(results);
          results.data.forEach((current) => {
            if (!current.hasOwnProperty('additional_view')) {
              current.additional_view = false;
            }
          });
          return {
            type: STORE,
            result: results,
          };
        })
      )
    )
  );

  @Effect({ dispatch: true })
  additionalViewAction = this.actions.pipe(
    ofType(ADDITIONAL_VIEW),
    concatMap((action: any) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select((state) => state['filing']['datatable'])
        ),
        map(([storeAction, store]) => {
          store.data.forEach((current) => {
            if (current.id === storeAction.result.id) {
              current.additional_view = !current.additional_view;
            } else {
              current.additional_view = false;
            }
          });

          return {
            type: STORE,
            result: store,
          };
        })
      )
    )
  );

  @Effect({ dispatch: true })
  updateAction = this.actions.pipe(
    ofType(UPDATE),
    concatMap((action) => {
      return concat(
        of({ type: CLEAR }),
        of({ type: INIT, result: action['result'] })
      );
    })
  );
}
