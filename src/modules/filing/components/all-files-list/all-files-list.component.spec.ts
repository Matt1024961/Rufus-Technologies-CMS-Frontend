import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFilesListComponent } from './all-files-list.component';

describe('AllFilesListComponent', () => {
  let component: AllFilesListComponent;
  let fixture: ComponentFixture<AllFilesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFilesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
