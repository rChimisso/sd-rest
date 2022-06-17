import {HttpErrorResponse} from '@angular/common/http';
import {createAction, props} from '@ngrx/store';

export const clearData = createAction('[Core] Clear Data');

export const handleError = createAction(
  '[Core] Handle Error',
  props<{error: HttpErrorResponse}>()
);
