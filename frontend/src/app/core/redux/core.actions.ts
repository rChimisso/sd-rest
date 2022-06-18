import {HttpErrorResponse} from '@angular/common/http';
import {createAction, props} from '@ngrx/store';

export const clearData = createAction('[Core] Clear Data');

export const retrieveAccountIds = createAction('[Core] Retrieve Account Ids');

export const saveAccountIds = createAction(
  '[Core] Save Account Ids',
  props<{accountIds: string[]}>()
);

export const handleError = createAction(
  '[Core] Handle Error',
  props<{error: HttpErrorResponse}>()
);

export const clearError = createAction('[Core] Clear Error');

export const updateLoader = createAction(
  '[Core] Update Loader',
  props<{showLoader: boolean}>()
);
