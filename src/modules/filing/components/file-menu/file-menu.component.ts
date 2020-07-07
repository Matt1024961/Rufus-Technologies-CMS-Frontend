import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';
import { INIT } from '@modules/filing/state/files/actions';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileMenuComponent implements OnInit {
  public dataObservable: Observable<ModuleInterface>;
  public currentParams: any = {};
  constructor(
    private route: ActivatedRoute,
    private store: Store<ModuleInterface>
  ) {
    this.dataObservable = store.select((states) => {
      return states['filing']['files'];
    });
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams]).subscribe(
      (params) => {
        const allParams = params.reduce(
          (acc, current) => Object.assign(acc, current),
          {}
        );
        this.currentParams = Object.assign(this.currentParams, allParams);
        this.store.dispatch({
          type: INIT,
          result: { id: this.currentParams.id },
        });
      }
    );
  }
}
