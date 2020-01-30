import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INIT } from '@modules/user/state/authentication/actions';

import { ModuleInterface } from '@modules/user/state/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private store: Store<ModuleInterface>,
  ) {
  }

  getAuthentication() {
    this.store.dispatch({
      type: INIT,
    });
  }
}
