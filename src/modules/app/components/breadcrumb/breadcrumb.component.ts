import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { RouterStateUrl } from '../../state/router/custom-router';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbObservable: Observable<RouterStateUrl>;
  public previousCrumbs = [];

  constructor(private store: Store<RouterStateUrl>) {
    this.breadcrumbObservable = this.store.select(states => {
      return states['router'];
    });
  }

  ngOnInit() {
    this.beginObserver();
  }

  beginObserver() {
    this.breadcrumbObservable.subscribe((options: any) => {
      if (options && options.state) {
        this.previousCrumbs.unshift(options.state);
      }
    });
  }

  getBreadcrumbs() {
    return this.previousCrumbs;
  }

}
