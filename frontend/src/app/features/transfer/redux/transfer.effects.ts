import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TypedAction} from '@ngrx/store/src/models';
import {switchMap, map, catchError, of, Observable} from 'rxjs';

import {ApiService} from 'src/app/core/services/api-service.service';
import {handleError} from 'src/app/features/app-overlay/redux/app-overlay.actions';

import {performTransfer, saveTransferResult} from './transfer.actions';

/**
 * Transfer Effects.
 *
 * @export
 * @class TransferEffects
 * @typedef {TransferEffects}
 */
@Injectable()
export class TransferEffects {
  /**
   * Intercetta la action {@link performTransfer} e rilancia la action:
   * - {@link saveTransferResult} in caso di risposta;
   * - {@link handleError} in caso di errore.
   *
   * @public
   * @type {Observable<TypedAction<"[Transfer] Save Transfer Result" | "[AppOverlay] Handle Error">>}
   */
  public performTransfer$: Observable<TypedAction<'[Transfer] Save Transfer Result' | '[AppOverlay] Handle Error'>> = createEffect(() => this.actions$.pipe(
    ofType(performTransfer),
    switchMap(({from, to, amount}) => this.apiService.postTransfer(from, to, amount).pipe(
      map(response => saveTransferResult(response)),
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
