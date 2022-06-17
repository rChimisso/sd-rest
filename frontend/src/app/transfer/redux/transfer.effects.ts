import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, map, catchError, of} from 'rxjs';

import {handleError} from 'src/app/core/redux/core.actions';
import {ApiService} from 'src/app/core/services/api-service.service';

import {performTranfer, retrieveAccountIds, saveAccountIds, saveTransferResult} from './transfer.actions';

@Injectable()
export class TransferEffects {
  public retrieveAccountIds$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccountIds),
    // TODO: call service
    switchMap(() => this.apiService.mockCall(['12345678901234567890', '0123456789abcdef1234']).pipe(
      map(accountIds => saveAccountIds({accountIds})),
      catchError(error => of(handleError({error})))
    ))
  ));

  public performTransfer$ = createEffect(() => this.actions$.pipe(
    ofType(performTranfer),
    // TODO: call service
    switchMap(() => this.apiService.mockCall({
      isError: false,
      message: 'success'
    }).pipe(
      map(({isError, message}) => saveTransferResult({
        isError,
        message
      })),
      catchError(error => of(handleError({error})))
    ))
  ));

  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
