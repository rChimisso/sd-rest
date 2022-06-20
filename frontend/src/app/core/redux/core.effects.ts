import {Injectable} from '@angular/core';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {switchMap, map, catchError, of} from 'rxjs';

import {handleError} from '../../features/app-overlay/redux/app-overlay.actions';
import {ApiService} from '../services/api-service.service';
import {retrieveAccountIds, saveAccountIds} from './core.actions';

/**
 * 
 *
 * @export
 * @class CoreEffects
 * @typedef {CoreEffects}
 */
@Injectable()
export class CoreEffects {
  /**
   * 
   *
   * @public
   * @type {*}
   */
  public retrieveAccountIds$ = createEffect(() => this.actions$.pipe(
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
