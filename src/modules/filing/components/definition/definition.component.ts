import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';
import { first } from 'rxjs/internal/operators/first';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefinitionComponent implements OnInit {
  public dataObservable: Observable<ModuleInterface>;
  public currentRowData: any;

  constructor(private store: Store<ModuleInterface>) {
    this.dataObservable = store.select((states) => {
      return states['filing']['datatable'];
    });
  }

  ngOnInit(): void {
    this.dataObservable.pipe(take(1)).subscribe((firstValue) => {
      this.currentRowData = firstValue['data'].find(
        (current) => current.additional_view
      );
    });
  }
}
