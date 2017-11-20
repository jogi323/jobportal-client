import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineOfferComponent } from './decline-offer.component';

describe('DeclineOfferComponent', () => {
  let component: DeclineOfferComponent;
  let fixture: ComponentFixture<DeclineOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclineOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclineOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
