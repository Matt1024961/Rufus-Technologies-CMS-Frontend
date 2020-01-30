import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthenticatedUserWelcomeComponent } from './authenticated-user-welcome.component';
import { UiModule } from '@modules/ui/ui.module';

describe('AuthenticatedUserWelcomeComponent', () => {
  let component: AuthenticatedUserWelcomeComponent;
  let fixture: ComponentFixture<AuthenticatedUserWelcomeComponent>;

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
      declarations: [AuthenticatedUserWelcomeComponent],
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
    fixture = TestBed.createComponent(AuthenticatedUserWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
