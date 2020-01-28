import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INIT } from '@modules/user/state/user-config/actions';

import { ModuleInterface } from '@modules/user/state/interface';


@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  public userConfigObservable: Observable<ModuleInterface>;

  constructor(
    private store: Store<ModuleInterface>,
  ) {

    this.userConfigObservable = store.select(states => {
      if (states && states['user']) {
        return states['user']['user-config'];
      }
    });
  }

  getConfiguration() {
    this.store.dispatch({
      type: INIT,
    });
  }
}
