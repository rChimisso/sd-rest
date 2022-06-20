import {Component, Inject, OnDestroy} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {getAccountIds} from 'src/app/core/redux';
import {clearData, retrieveAccountIds} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';

/**
 * Generico container con un {@link FormGroup} e la necessità di accedere alla lista degli accountIds.
 *
 * @export
 * @abstract
 * @class AbstractFormContainer
 * @typedef {AbstractFormContainer}
 * @template T extends {[K in keyof T]: AbstractControl}
 * @implements {OnDestroy}
 */
@Component({template: ''})
export abstract class AbstractFormContainer<T extends {[K in keyof T]: AbstractControl}> implements OnDestroy {
  /**
   * Observable della lista di accountIds.
   *
   * @public
   * @type {Observable<string[]>}
   */
  public accountIds$: Observable<string[]> = this.appState$.select(getAccountIds(this.featureKey));

  /**
   * @constructor
   * @public
   * @param {keyof State} featureKey
   * @param {FormGroup<T>} formGroup
   * @param {Store<State>} appState$
   */
  public constructor(@Inject(String) private readonly featureKey: keyof State, protected readonly formGroup: FormGroup<T>, protected readonly appState$: Store<State>) {
    this.appState$.dispatch(retrieveAccountIds());
  }

  /**
   * Metodo del ciclo di vita di Angular.  
   * Gestisce la distruzione del componente.
   *
   * @public
   */
  public ngOnDestroy() {
    this.appState$.dispatch(clearData());
  }
}
