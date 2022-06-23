import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {MonoTypeOperatorFunction, Subject, takeUntil} from 'rxjs';

import {clearData} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';

/**
 * Generico container con accesso allo store dell'applicazione.
 *
 * @export
 * @abstract
 * @class AbstractSmartContainer
 * @typedef {AbstractSmartContainer}
 * @implements {OnDestroy}
 */
@Component({template: ''})
export abstract class AbstractSmartContainer implements OnDestroy {
  /**
   * Soggetto per regolare le subscription.
   *
   * @private
   * @readonly
   * @type {Subject<void>}
   */
  private readonly subject: Subject<void> = new Subject();

  /**
   * @constructor
   * @public
   * @param {Store<State>} appState$
   */
  public constructor(protected readonly appState$: Store<State>) {}

  /**
   * Metodo del ciclo di vita di Angular.  
   * Gestisce la distruzione del componente.
   *
   * @public
   */
  public ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
    this.appState$.dispatch(clearData());
  }

  /**
   * Wrapper per {@link takeUntil} che utilizza il {@link subject} interno.
   *
   * @protected
   * @returns {MonoTypeOperatorFunction<unknown>}
   */
  protected takeUntil<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.subject);
  }
}
