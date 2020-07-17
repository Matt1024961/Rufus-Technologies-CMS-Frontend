import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleInterface } from '@modules/app/state/interface';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-all-files-list',
  templateUrl: './all-files-list.component.html',
  styleUrls: ['./all-files-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllFilesListComponent implements OnInit {
  public dataObservable: Observable<ModuleInterface>;
  public currentRowData: any;

  constructor(private store: Store<ModuleInterface>) {
    this.dataObservable = store.select((states) => {
      return states['filing']['datatable'];
    });
  }

  ngOnInit(): void {
    this.dataObservable.pipe(first()).subscribe((firstValue) => {
      this.currentRowData = firstValue['data'].find(
        (current) => current.additional_view
      );
    });
  }

  setRouterLink(input) {
    if (input.primary) {
      return `/filings/view/${this.currentRowData.id}`;
    }
    return `/filings/view/${this.currentRowData.id}/${input.file}`;
  }
}
