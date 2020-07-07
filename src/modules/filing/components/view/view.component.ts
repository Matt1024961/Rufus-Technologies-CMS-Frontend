import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';
import { INIT, UPDATE } from '@modules/filing/state/view/actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-host',
  },
})
export class ViewComponent implements OnInit {
  public pageSizeOptions: number[] = [1, 3, 5];

  public dataObservable: Observable<ModuleInterface>;
  public dataFilterObservable: Observable<ModuleInterface>;

  public searchForm: FormGroup;
  public userOptions: any = {};

  constructor(
    private route: ActivatedRoute,
    private store: Store<ModuleInterface>,
    private actions: Actions,
    private formBuilder: FormBuilder
  ) {
    this.dataObservable = store.select((states) => {
      return states['filing']['view'];
    });
    this.dataFilterObservable = store.select((states) => {
      return states['filing']['view_filter'];
    });

    this.actions.pipe(ofType(UPDATE)).subscribe((data) => {
      if (data && this.userOptions.href) {
        window.setTimeout(() => {
          const element = document.querySelector(
            `[name='${this.userOptions.href.substr(1)}']`
          );
          if (element) {
            element.scrollIntoView();
          } else {
            console.error('element not found');
          }
        }, 500);
      }
    });

    this.dataFilterObservable.subscribe((options) => {
      this.userOptions = Object.assign(this.userOptions, options);
      this.searchForm = this.formBuilder.group({
        filter: [
          this.userOptions.filter,
          [Validators.required, Validators.minLength(3)],
        ],
      });
      this.onSearchChange();
    });
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams]).subscribe(
      (params) => {
        const allParams = params.reduce(
          (acc, current) => Object.assign(acc, current),
          {}
        );
        delete this.userOptions.file;
        this.userOptions = Object.assign(this.userOptions, allParams);
        this.store.dispatch({
          type: INIT,
          result: { params: this.userOptions, id: this.userOptions.id },
        });
      }
    );
  }

  onSearchChange(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((formValue) => {
        this.userOptions.page_index = 0;
        if (formValue.filter !== null) {
          this.userOptions.filter = formValue.filter;
        }
        console.log(this.userOptions);
        // this.store.dispatch({
        //   type: UPDATE,
        //   result: this.userOptions,
        // });
      });
  }

  getPageAttribute(attributes) {
    return attributes[0].value;
  }

  getStyleAttribute(attributes) {
    let attributesToReturn = {};
    if (attributes) {
      attributes.forEach((current) => {
        if (current.key === 'style') {
          attributesToReturn = current.value;
        }
      });
    }
    return attributesToReturn;
  }

  getColspanAttribute(attributes) {
    let attributesToReturn;
    if (attributes) {
      attributes.forEach((current) => {
        if (current.key === 'colspan') {
          attributesToReturn = current.value;
        }
      });
    }
    return attributesToReturn;
  }

  getSrcAttribute(attributes) {
    let attributesToReturn;
    if (attributes) {
      attributes.forEach((current) => {
        if (current.key === 'src') {
          attributesToReturn = current.value;
        }
      });
    }
    return attributesToReturn;
  }

  getNameAttribute(attributes) {
    let attributesToReturn;
    if (attributes) {
      attributes.forEach((current) => {
        if (current.key === 'name') {
          attributesToReturn = current.value;
        }
      });
    }
    return attributesToReturn;
  }

  getHeightAttribute(attributes) {
    const height = attributes.find((element) => element.key === 'data-height');
    if (height) {
      return height.value;
    }
  }

  getWidthAttribute(attributes) {
    const width = attributes.find((element) => element.key === 'data-width');
    if (width) {
      return width.value;
    }
  }

  getClickAction(attributes) {
    const attributesToReturn = {};
    if (attributes) {
      attributes.forEach((current) => {
        if (current.key === 'href') {
          const element = document.querySelector(
            `[name='${current.value.substr(1)}']`
          );
          if (element) {
            element.scrollIntoView();
            return;
          } else {
            attributesToReturn['href'] = current.value;
          }
        }
        if (current.key === 'data-page') {
          attributesToReturn['page'] = parseInt(current.value, 10);
        }
      });
    }

    // we figure out what page to go to, based on the this.userOptions
    const pageSection =
      Math.floor(
        attributesToReturn['page'] /
          (this.userOptions.page_index * this.userOptions.page_size)
      ) + 1;
    this.userOptions.page_index = pageSection;
    this.userOptions.href = attributesToReturn['href'];
    this.store.dispatch({
      type: UPDATE,
      result: { params: this.userOptions, id: this.userOptions.id },
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
        result: { params: this.userOptions, id: this.userOptions.id },
      });
    }
  }
}
