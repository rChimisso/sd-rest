import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, of, switchMap} from 'rxjs';

import {ApiService} from 'src/app/core/services/api-service.service';
import {handleError} from 'src/app/features/app-overlay/redux/app-overlay.actions';

import {retrieveAccounts, saveAccounts} from './accounts-list.actions';

@Injectable()
export class AccountListEffects {
  public retrieveActives$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccounts),
    filter(({showDeleted}) => !showDeleted),
    switchMap(() => this.apiService.getActive().pipe(
      map(accounts => saveAccounts({accounts})),
      catchError(error => of(handleError({error})))
    ))
  ));

  public retrieveAccounts$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccounts),
    filter(({showDeleted}) => showDeleted),
    switchMap(() => this.apiService.getAccount().pipe(
      map(accounts => saveAccounts({accounts})),
      catchError(error => of(handleError({error})))
    ))
  ));

  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
