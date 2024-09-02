import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableRideComponent } from './available-ride.component';

describe('AvailableRideComponent', () => {
  let component: AvailableRideComponent;
  let fixture: ComponentFixture<AvailableRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableRideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
