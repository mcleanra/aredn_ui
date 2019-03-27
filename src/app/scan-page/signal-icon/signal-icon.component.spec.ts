import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalIconComponent } from './signal-icon.component';

describe('SignalIconComponent', () => {
  let component: SignalIconComponent;
  let fixture: ComponentFixture<SignalIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignalIconComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
