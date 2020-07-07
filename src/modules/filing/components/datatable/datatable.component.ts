import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';
import {
  ADDITIONAL_VIEW,
  UPDATE,
  CLEAR,
} from '@modules/filing/state/datatable/actions';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-host',
  },
  providers: [],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '40vh', overflow: 'hidden' })),
      transition('expanded <=> collapsed', animate('300ms ease')),
    ]),
  ],
})
export class DatatableComponent implements OnInit, OnDestroy {
  public pageSizeOptions: number[] = [25, 50, 100];

  public displayedColumns: string[] = [
    'view',
    'id',
    'cik',
    'publish_date',
    'form_type',
    'name',
    'filing_period',
    'file_number',
    'acceptance_date',
  ];

  public userOptions: any = {};

  public dataObservable: Observable<ModuleInterface>;

  public datatableFilterObservable: Observable<ModuleInterface>;

  public filterObserver: { next: (arg0: any) => void };

  public searchForm: FormGroup;

  constructor(
    private store: Store<ModuleInterface>,
    private formBuilder: FormBuilder
  ) {
    this.dataObservable = store.select((states) => {
      return states['filing']['datatable'];
    });

    this.datatableFilterObservable = store.select((states) => {
      return states['filing']['datatable_filter'];
    });

    this.datatableFilterObservable.subscribe((options) => {
      this.userOptions = Object.assign(this.userOptions, options);
      this.searchForm = this.formBuilder.group({
        filter: [
          this.userOptions.filter,
          [Validators.required, Validators.minLength(3)],
        ],

        filing_inline: [this.userOptions.filing_inline, [Validators.required]],

        parsing_accomplished: [
          this.userOptions.parsing_accomplished,
          [Validators.required],
        ],
      });
      this.onSearchChange();
    });
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: UPDATE,
      result: this.userOptions,
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch({
      type: CLEAR,
    });
  }

  reloadContent() {
    this.userOptions = {
      page_index: 1,
      page_size: 25,
      filter: null,
      filing_inline: null,
      parsing_accomplished: null,
      order: 'name',
      order_direction: 'asc',
      cik: null,
      form_type: null,
      filing_period: null,
    };
    this.store.dispatch({
      type: UPDATE,
      result: this.userOptions,
    });
  }

  onPaginateChange($event) {
    $event.pageIndex++;
    if (
      this.userOptions.page_index !== $event.pageIndex ||
      this.userOptions.page_size !== $event.pageSize
    ) {
      this.userOptions.page_index = $event.pageIndex;
      this.userOptions.page_size = $event.pageSize;
      delete $event.previousPageIndex;
      delete $event.length;
      this.store.dispatch({
        type: UPDATE,
        result: this.userOptions,
      });
    }
  }

  onSortChange($event) {
    if ($event.direction) {
      this.userOptions.order = $event.active;
      this.userOptions.order_direction = $event.direction;
    } else {
      this.userOptions.order = 'name';
      this.userOptions.order_direction = 'asc';
    }

    this.userOptions.order_direction === 'desc'
      ? (this.userOptions.order = `-${this.userOptions.order}`)
      : (this.userOptions.order = `${this.userOptions.order}`);

    this.store.dispatch({
      type: UPDATE,
      result: this.userOptions,
    });
  }

  onAdditionalView(input): void {
    this.store.dispatch({
      type: ADDITIONAL_VIEW,
      result: input,
    });
  }

  onSearchChange(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((formValue) => {
        this.userOptions.page_index = 0;
        this.userOptions.parsing_accomplished = formValue.parsing_accomplished;
        if (formValue.filter !== null) {
          this.userOptions.filter = formValue.filter;
        }

        this.store.dispatch({
          type: UPDATE,
          result: this.userOptions,
        });
      });
  }

  onCIKFilter(cik): void {
    this.userOptions.cik = cik;
    this.store.dispatch({
      type: UPDATE,
      result: this.userOptions,
    });
  }

  onFormTypeFilter(formType): void {
    this.userOptions.form_type = formType;
    this.store.dispatch({
      type: UPDATE,
      result: this.userOptions,
    });
  }

  onFilingPeriodFilter(filingPeriod): void {
    this.userOptions.filing_period = filingPeriod;
    this.store.dispatch({
      type: UPDATE,
      result: this.userOptions,
    });
  }

  toggleParsingAccomplished() {
    switch (this.userOptions.parsing_accomplished) {
      case true: {
        this.userOptions.parsing_accomplished = false;
        break;
      }
      case false: {
        this.userOptions.parsing_accomplished = null;
        break;
      }
      default: {
        this.userOptions.parsing_accomplished = true;
        break;
      }
    }
    this.searchForm.patchValue({
      parsing_accomplished: this.userOptions.parsing_accomplished,
    });
  }

  toggleFilingInline() {
    switch (this.userOptions.filing_inline) {
      case true: {
        this.userOptions.filing_inline = false;
        break;
      }
      case false: {
        this.userOptions.filing_inline = null;
        break;
      }
      default: {
        this.userOptions.filing_inline = true;
        break;
      }
    }
    this.searchForm.patchValue({
      filing_inline: this.userOptions.filing_inline,
    });
  }
}
