import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ThemeComponent } from './theme.component';
import { UiModule } from '@modules/ui/ui.module';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  const initialState = {
    'user': {
      'user-config': {
        'theme-name': 'indigo-pink',
        'theme-href': 'assets/themes/indigo-pink.css',
        'font': 1
      }
    }
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ThemeComponent],
      imports: [
        UiModule,
      ],
      providers: [
        provideMockStore({ initialState })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
