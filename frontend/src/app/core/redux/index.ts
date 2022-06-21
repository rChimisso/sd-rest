import {createSelector} from '@ngrx/store';

import {Nullable} from '../models/nullable.type';
import {State} from './core.reducers';

/**
 * Selettore parametrico dello {@link State Stato} dello store.
 *
 * @param {State} state
 * @returns {State}
 */
export const getCoreState = (state: State): State => state;

/**
 * Selettore parametrico di un Feature State.
 *
 * @param {keyof State} featureKey
 * @returns {MemoizedSelector<State, Nullable<State | State | State | State>, Nullable<DefaultProjectorFn<State | State | State | State>>>}
 */
export const getFeatureState = (featureKey: keyof State) => createSelector(
  getCoreState,
  (state: State) => state ? state[featureKey] : null
);

/**
 * Selettore parametrico di accountIds per un Feature State.
 *
 * @param {keyof State} featureKey
 * @returns {MemoizedSelector<State, string[], DefaultProjectorFn<string[]>>}
 */
export const getAccountIds = (featureKey: keyof State) => createSelector(
  getFeatureState(featureKey),
  (state: Nullable<State[keyof State]>) => state && 'accountIds' in state ? state.accountIds : []
);
