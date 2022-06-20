import {HttpErrorResponse} from '@angular/common/http';
import {createAction, props} from '@ngrx/store';

export const handleError = createAction(
  '[AppOverlay] Handle Error',
  props<{ error: HttpErrorResponse }>()
);

export const clearError = createAction('[AppOverlay] Clear Error');

export const incrementActiveCalls = createAction('[AppOverlay] Increment Active Calls');

export const decrementActiveCalls = createAction('[AppOverlay] Decrement Active Calls');
