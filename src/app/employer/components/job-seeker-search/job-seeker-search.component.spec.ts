import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerSearchComponent } from './job-seeker-search.component';

describe('JobSeekerSearchComponent', () => {
  let component: JobSeekerSearchComponent;
  let fixture: ComponentFixture<JobSeekerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
