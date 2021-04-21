import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantComponent } from './attendant.component';

describe('AttendantComponent', () => {
  let component: AttendantComponent;
  let fixture: ComponentFixture<AttendantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
