import {HttpErrorResponse} from '@angular/common/http';
import {createAction, props} from '@ngrx/store';

export const handleError = createAction(
  '[AppOverlay] Handle Error',
  props<{ error: HttpErrorResponse }>()
);

export const clearError = createAction('[AppOverlay] Clear Error');

export const updateLoader = createAction(
  '[AppOverlay] Update Loader',
  props<{ showLoader: boolean }>()
);
