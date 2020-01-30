import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/user/state/interface';
import { Observable } from 'rxjs';
import { LOGOUT } from '@modules/user/state/authentication/actions';

@Component({
  selector: 'app-authenticated-user-welcome',
  templateUrl: './authenticated-user-welcome.component.html',
  styleUrls: ['./authenticated-user-welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatedUserWelcomeComponent implements OnInit {

  public authenticationObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.authenticationObservable = store.select(states => {
      return states['user']['authentication'];
    });
  }

  ngOnInit() {
  }

  logout(event) {
    if (event.isTrusted) {
      this.store.dispatch({
        type: LOGOUT
      });
    }
  }
}
