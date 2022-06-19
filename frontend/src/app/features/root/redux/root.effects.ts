import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, of, switchMap} from 'rxjs';

import {ApiService} from 'src/app/core/services/api-service.service';
import {handleError} from 'src/app/features/app-overlay/redux/app-overlay.actions';

import {retrieveAccountData, saveAccount, saveHistory} from './root.actions';

@Injectable()
export class RootEffects {
  public retrieveAccountData$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccountData),
    switchMap(({accountId}) => this.apiService.getAccountId(accountId).pipe(
      switchMap(({account, history}) => [
        saveAccount({account}),
        saveHistory({
          history: history.map(movement => ({
            ...movement,
            date: new Date(movement.date)
          }))
        })
      ]),
      catchError(error => of(handleError({error})))
    ))
  ));

  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
