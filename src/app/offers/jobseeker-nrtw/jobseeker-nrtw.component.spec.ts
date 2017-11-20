import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerNrtwComponent } from './jobseeker-nrtw.component';

describe('JobseekerNrtwComponent', () => {
  let component: JobseekerNrtwComponent;
  let fixture: ComponentFixture<JobseekerNrtwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobseekerNrtwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerNrtwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
