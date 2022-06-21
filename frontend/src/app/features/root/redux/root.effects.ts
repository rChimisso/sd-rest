import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TypedAction} from '@ngrx/store/src/models';
import {catchError, Observable, of, switchMap} from 'rxjs';

import {ApiService} from 'src/app/core/services/api-service.service';
import {handleError} from 'src/app/features/app-overlay/redux/app-overlay.actions';

import {retrieveAccountHistory, saveAccount, saveHistory} from './root.actions';

/**
 * Root Effects.
 *
 * @export
 * @class RootEffects
 * @typedef {RootEffects}
 */
@Injectable()
export class RootEffects {
  /**
   * Intercetta la action {@link retrieveAccountHistory} e rilancia le action:
   * - {@link saveAccount} e {@link saveHistory} in caso di risposta;
   * - {@link handleError} in caso di errore.
   *
   * @public
   * @type {Observable<TypedAction<"[Root] Save Account" | "[Root] Save History" | "[AppOverlay] Handle Error">>}
   */
  public retrieveAccountHistory$: Observable<TypedAction<'[Root] Save Account' | '[Root] Save History' | '[AppOverlay] Handle Error'>> = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccountHistory),
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

  /**
   * @constructor
   * @public
   * @param {Actions} actions$
   * @param {ApiService} apiService
   */
  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
