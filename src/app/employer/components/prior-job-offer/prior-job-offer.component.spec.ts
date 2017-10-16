import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorJobOfferComponent } from './prior-job-offer.component';

describe('PriorJobOfferComponent', () => {
  let component: PriorJobOfferComponent;
  let fixture: ComponentFixture<PriorJobOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorJobOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
