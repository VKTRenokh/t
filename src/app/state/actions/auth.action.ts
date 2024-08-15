import { createActionGroup, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ email: string; password: string }>(),
    loginSuccess: props<{ token: string }>(),
    loginFailure: props<{
      // FIX: Fix this
      error: unknown;
    }>(),
  },
});
