import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap } from 'rxjs/operators';

import { INIT } from '@modules/dashboard/state/container/actions';

import { STORE as STORE_OVERVIEW } from '@modules/dashboard/state/overview/actions';
import { STORE as STORE_COUNTS } from '@modules/dashboard/state/counts/actions';

import { STORE as STORE_NEWEST } from '@modules/dashboard/state/newest/actions';

// import { STORE_COUNTS } from "@modules/dashboard/state/counts/actions";
// import { STORE_NEWEST } from "@modules/dashboard/state/newest/actions";

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
      this.restfulService.getContainer().pipe(
        concatMap((results: any) => {
          const overview = results.overview;
          const counts = results.counts;
          const newest = results.newest;

          return concat(
            of({ type: STORE_OVERVIEW, result: overview }),
            of({ type: STORE_COUNTS, result: counts }),
            of({ type: STORE_NEWEST, result: newest })
          );
        })
      )
    )
  );
}
