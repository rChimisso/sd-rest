import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TypedAction} from '@ngrx/store/src/models';
import {catchError, filter, map, Observable, of, switchMap} from 'rxjs';

import {ApiService} from 'src/app/core/services/api-service.service';
import {handleError} from 'src/app/features/app-overlay/redux/app-overlay.actions';

import {retrieveAccounts, saveAccounts} from './accounts-list.actions';

/**
 * Accounts List Effects.
 *
 * @export
 * @class AccountListEffects
 * @typedef {AccountsListEffects}
 */
@Injectable()
export class AccountsListEffects {
  /**
   * Intercetta la action {@link retrieveAccounts}, se `showDeleted` è `false`, e rilancia la action:
   * - {@link saveAccounts} in caso di risposta;
   * - {@link handleError} in caso di errore.
   *
   * @public
   * @type {Observable<TypedAction<"[AccountsList] Save Accounts" | "[AppOverlay] Handle Error">>}
   */
  public retrieveActives$: Observable<TypedAction<'[AccountsList] Save Accounts' | '[AppOverlay] Handle Error'>> = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccounts),
    filter(({showDeleted}) => !showDeleted),
    switchMap(() => this.apiService.getActive().pipe(
      map(accounts => saveAccounts({accounts})),
      catchError(error => of(handleError({error})))
    ))
  ));

  /**
   * Intercetta la action {@link retrieveAccounts} e, se `showDeleted` è `true`, rilancia la action:
   * - {@link saveAccounts} in caso di risposta;
   * - {@link handleError} in caso di errore.
   *
   * @public
   * @type {Observable<TypedAction<"[AccountsList] Save Accounts" | "[AppOverlay] Handle Error">>}
   */
  public retrieveAccounts$: Observable<TypedAction<'[AccountsList] Save Accounts' | '[AppOverlay] Handle Error'>> = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccounts),
    filter(({showDeleted}) => showDeleted),
    switchMap(() => this.apiService.getAccount().pipe(
      map(accounts => saveAccounts({accounts})),
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
