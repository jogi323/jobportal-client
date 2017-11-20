import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptJobseekerComponent } from './accept-jobseeker.component';

describe('AcceptJobseekerComponent', () => {
  let component: AcceptJobseekerComponent;
  let fixture: ComponentFixture<AcceptJobseekerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptJobseekerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptJobseekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
