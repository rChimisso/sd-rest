import {Injectable} from '@angular/core';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {TypedAction} from '@ngrx/store/src/models';
import {switchMap, map, catchError, of, Observable} from 'rxjs';

import {handleError} from '../../features/app-overlay/redux/app-overlay.actions';
import {ApiService} from '../services/api-service.service';
import {retrieveAccountIds, saveAccountIds} from './core.actions';

/**
 * Core Effects.
 *
 * @export
 * @class CoreEffects
 * @typedef {CoreEffects}
 */
@Injectable()
export class CoreEffects {
  /**
   * Intercetta la action {@link retrieveAccountIds} e rilancia la action:
   * - {@link saveAccountIds} in caso di risposta;
   * - {@link handleError} in caso di errore.
   *
   * @public
   * @type {Observable<TypedAction<"[Core] Save Account Ids" | "[AppOverlay] Handle Error">>}
   */
  public retrieveAccountIds$: Observable<TypedAction<'[Core] Save Account Ids' | '[AppOverlay] Handle Error'>> = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccountIds),
    switchMap(() => this.apiService.getActive().pipe(
      map(accounts => saveAccountIds({accountIds: accounts.map(account => account.uuid)})),
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
