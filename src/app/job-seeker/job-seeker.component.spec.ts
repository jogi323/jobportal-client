import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerComponent } from './job-seeker.component';

describe('JobSeekerComponent', () => {
  let component: JobSeekerComponent;
  let fixture: ComponentFixture<JobSeekerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
