import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanListResultsComponent } from './scan-list-results.component';

describe('ScanListResultsComponent', () => {
  let component: ScanListResultsComponent;
  let fixture: ComponentFixture<ScanListResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanListResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanListResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
