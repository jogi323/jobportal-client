import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerRtwComponent } from './jobseeker-rtw.component';

describe('JobseekerRtwComponent', () => {
  let component: JobseekerRtwComponent;
  let fixture: ComponentFixture<JobseekerRtwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobseekerRtwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerRtwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
