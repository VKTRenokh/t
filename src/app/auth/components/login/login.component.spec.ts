import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppState } from '../../../state/app.state';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const initialState: AppState = {
    auth: { loading: false, isAuthorized: false },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([
          { path: '**', component: LoginComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
