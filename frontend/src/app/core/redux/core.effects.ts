import {Injectable} from '@angular/core';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {switchMap, map, catchError, of} from 'rxjs';

import {ApiService} from '../services/api-service.service';
import {retrieveAccountIds, handleError, saveAccountIds} from './core.actions';

@Injectable()
export class CoreEffects {
  public retrieveAccountIds$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccountIds),
    // TODO: call service
    switchMap(() => this.apiService.mockCall(['12345678901234567890', '0123456789abcdef1234']).pipe(
      map(accountIds => saveAccountIds({accountIds})),
      catchError(error => of(handleError({error})))
    ))
  ));

  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
