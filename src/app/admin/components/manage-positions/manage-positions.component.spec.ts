import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePositionsComponent } from './manage-positions.component';

describe('ManagePositionsComponent', () => {
  let component: ManagePositionsComponent;
  let fixture: ComponentFixture<ManagePositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
