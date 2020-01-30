import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/user/state/interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-authenticated-user-favorites',
  templateUrl: './authenticated-user-favorites.component.html',
  styleUrls: ['./authenticated-user-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatedUserFavoritesComponent implements OnInit {
  public favoritesObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.favoritesObservable = store.select(states => {
      return states['user']['favorites'];
    });
  }

  ngOnInit() {
  }

}
