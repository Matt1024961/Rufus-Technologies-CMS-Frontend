import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ModuleInterface } from '@modules/user/state/interface';
import { UPDATE } from '@modules/user/state/user-config/actions';

import { reducer } from '@modules/user/state/user-config';

import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  // let component: ThemeComponent;
  // let fixture: ComponentFixture<ThemeComponent>;
  // let mockStore: MockStore<ModuleInterface>;
  // let mockSelector: MemoizedSelector<ModuleInterface, object>;
  // const queryDivText = () =>
  //   fixture.debugElement.queryAll(By.css('div'))[0].nativeElement.textContent;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     providers: [provideMockStore()],
  //     declarations: [ThemeComponent],
  //     schemas: [CUSTOM_ELEMENTS_SCHEMA]

  //   });

  //   fixture = TestBed.createComponent(ThemeComponent);
  //   mockStore = TestBed.get(Store);
  //   console.log(mockStore);

  //   mockSelector = mockStore.overrideSelector(reducer, UPDATE);
  //   fixture.detectChanges();

  //   it('should greet John when the username is John', () => {
  //     expect(queryDivText()).toBe('Greetings, John!');
  //   });

  // }));


  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ThemeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
