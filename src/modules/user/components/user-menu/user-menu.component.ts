import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/user/state/interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent implements OnInit {

  public authenticationObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.authenticationObservable = store.select(states => {
      return states['user']['authentication'];
    });
  }

  ngOnInit() {
  }

}
