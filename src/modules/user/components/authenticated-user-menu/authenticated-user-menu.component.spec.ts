import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthenticatedUserMenuComponent } from './authenticated-user-menu.component';
import { UiModule } from '@modules/ui/ui.module';
describe('AuthenticatedUserMenuComponent', () => {
  let component: AuthenticatedUserMenuComponent;
  let fixture: ComponentFixture<AuthenticatedUserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticatedUserMenuComponent],
      imports: [
        UiModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
