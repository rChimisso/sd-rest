import {createSelector} from '@ngrx/store';

import {Nullable} from '../models/nullable.type';
import {State} from './core.reducers';

export const getCoreState = (state: State) => state;

export const getFeatureState = (featureKey: keyof State) => createSelector(
  getCoreState,
  (state: State) => state ? state[featureKey] : null
);

export const getAccountIds = (featureKey: keyof State) => createSelector(
  getFeatureState(featureKey),
  (state: Nullable<State[keyof State]>) => state && 'accountIds' in state ? state.accountIds : []
);
