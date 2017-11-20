import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectJobseekerComponent } from './reject-jobseeker.component';

describe('RejectJobseekerComponent', () => {
  let component: RejectJobseekerComponent;
  let fixture: ComponentFixture<RejectJobseekerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectJobseekerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectJobseekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
