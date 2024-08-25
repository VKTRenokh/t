import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { ChengePasswordDialogComponent } from './chenge-password-dialog.component';

describe('ChengePasswordDialogComponent', () => {
  let component: ChengePasswordDialogComponent;
  let fixture: ComponentFixture<ChengePasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChengePasswordDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ChengePasswordDialogComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
