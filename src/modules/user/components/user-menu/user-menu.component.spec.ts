import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserMenuComponent } from './user-menu.component';
import { UiModule } from '@modules/ui/ui.module';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  const initialState = {
    user: {
      'user-config': {
        'theme-name': 'indigo-pink',
        'theme-href': 'assets/themes/indigo-pink.css',
        font: 1
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      imports: [
        UiModule,
      ],
      providers: [
        provideMockStore({ initialState })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
