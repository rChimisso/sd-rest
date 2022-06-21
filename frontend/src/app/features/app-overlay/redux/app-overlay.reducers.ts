import {HttpErrorResponse} from '@angular/common/http';
import {ActionReducer, createReducer, on} from '@ngrx/store';

import {Nullable} from 'src/app/core/models/nullable.type';
import {clearData} from 'src/app/core/redux/core.actions';
import {handleError, clearError, incrementPendingCalls, decrementPendingCalls} from 'src/app/features/app-overlay/redux/app-overlay.actions';

/**
 * Stato.
 *
 * @interface State
 * @typedef {State}
 */
interface State {
  /**
   * Eventuale {@link HttpErrorResponse Errore HTTP} dell'ultima chiamata HTTP effettuata.
   *
   * @type {Nullable<HttpErrorResponse>}
   */
  error: Nullable<HttpErrorResponse>;
  /**
   * Numero di chiamate HTTP attualmente in pending.
   *
   * @type {number}
   */
  pendingCalls: number;
}

/**
 * Stato iniziale.
 *
 * @type {State}
 */
const INITIAL_STATE: State = {
  error: null,
  pendingCalls: 0
};

/**
 * Reducer per l'intercettazione delle action e il salvataggio del loro payload sullo store.
 *
 * @type {ActionReducer<State>}
 */
const appOverlayReducer: ActionReducer<State> = createReducer(
  INITIAL_STATE,
  on(clearData, () => INITIAL_STATE),
  on(handleError, (state, {error}) => ({
    ...state,
    error
  })),
  on(clearError, state => ({
    ...state,
    error: null
  })),
  on(incrementPendingCalls, state => ({
    ...state,
    pendingCalls: state.pendingCalls + 1
  })),
  on(decrementPendingCalls, state => ({
    ...state,
    pendingCalls: state.pendingCalls - 1
  }))
);

export {State, appOverlayReducer};
