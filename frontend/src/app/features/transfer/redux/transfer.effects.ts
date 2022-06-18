import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, map, catchError, of} from 'rxjs';

import {handleError} from 'src/app/core/redux/core.actions';
import {ApiService} from 'src/app/core/services/api-service.service';

import {performTransfer, saveTransferResult} from './transfer.actions';

@Injectable()
export class TransferEffects {
  public performTransfer$ = createEffect(() => this.actions$.pipe(
    ofType(performTransfer),
    switchMap(({from, to, amount}) => this.apiService.postTransfer(from, to, amount).pipe(
      map(({performed, message}) => saveTransferResult({
        performed,
        message
      })),
      catchError(error => of(handleError({error})))
    ))
  ));

  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
