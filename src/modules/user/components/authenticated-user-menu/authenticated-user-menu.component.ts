import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/app/state/interface';
import { STORE_USER } from '@modules/app/state/menu/actions';

@Component({
  selector: 'app-authenticated-user-menu',
  templateUrl: './authenticated-user-menu.component.html',
  styleUrls: ['./authenticated-user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticatedUserMenuComponent implements OnInit {
  constructor(private store: Store<ModuleInterface>) {}

  ngOnInit() {}

  closeMenu() {
    this.store.dispatch({
      type: STORE_USER,
    });
  }
}
