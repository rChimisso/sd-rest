import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TypedAction} from '@ngrx/store/src/models';
import {switchMap, map, catchError, of, Observable} from 'rxjs';

import {ApiService} from 'src/app/core/services/api-service.service';
import {handleError} from 'src/app/features/app-overlay/redux/app-overlay.actions';

import {performTransaction, saveTransactionResult} from './transaction.actions';

/**
 * Transaction Effects.
 *
 * @export
 * @class TransactionEffects
 * @typedef {TransactionEffects}
 */
@Injectable()
export class TransactionEffects {
  /**
   * Intercetta la action {@link performTransaction} e rilancia la action:
   * - {@link saveTransactionResult} in caso di risposta;
   * - {@link handleError} in caso di errore.
   *
   * @public
   * @type {Observable<TypedAction<"[Transaction] Save Transaction Result" | "[AppOverlay] Handle Error">>}
   */
  public performTransaction$: Observable<TypedAction<'[Transaction] Save Transaction Result' | '[AppOverlay] Handle Error'>> = createEffect(() => this.actions$.pipe(
    ofType(performTransaction),
    switchMap(({accountId, amount}) => this.apiService.postAccountId(accountId, amount).pipe(
      map(response => saveTransactionResult(response)),
      catchError(error => of(handleError({error})))
    ))
  ));

  /**
   * @constructor
   * @public
   * @param {Actions} actions$
   * @param {ApiService} apiService
   */
  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
