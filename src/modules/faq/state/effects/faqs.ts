import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap } from 'rxjs/operators';

import { INIT, UPDATE, CLEAR, STORE } from '@modules/faq/state/faqs/actions';

import { RestfulService } from '@modules/faq/services/restful/restful.service';
import { concat, of } from 'rxjs';

@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private restfulService: RestfulService
  ) { }

  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    mergeMap((action: any) =>
      this.restfulService.getFaqs(action['result']).pipe(
        map((results: any) => {
          return {
            type: STORE,
            result: results
          };
        }
        )
      )
    )
  );

  @Effect({ dispatch: true })
  updateAction = this.actions.pipe(
    ofType(UPDATE),
    concatMap(action => concat(
      of({ type: CLEAR }),
      of({ type: INIT, result: action }),
    ))
  );
}
