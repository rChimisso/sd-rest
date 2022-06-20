import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormGroup, ɵTypedOrUntyped} from '@angular/forms';

/**
 * Generico componente con l'accesso a un {@link FormGroup} in input.
 *
 * @export
 * @abstract
 * @class AbstractFormComponent
 * @typedef {AbstractFormComponent}
 * @template T extends {[K in keyof T]: AbstractControl}
 * @template E = never
 */
@Component({template: ''})
export abstract class AbstractFormComponent<T extends {[K in keyof T]: AbstractControl}, E = never> {
  /**
   * FormGroup in input.
   *
   * @public
   * @type {!FormGroup<T>}
   */
  @Input()
  public formGroup!: FormGroup<T>;

  /**
   * EventEmitter per il click sul pulsante di submit.
   *
   * @public
   * @type {EventEmitter<E>}
   */
  @Output()
  public submit: EventEmitter<E> = new EventEmitter<E>();

  /**
   * Se il {@link FormGroup} non è valido.
   *
   * @public
   * @readonly
   * @type {boolean}
   */
  public get isFormInvalid(): boolean {
    return this.formGroup.invalid;
  }

  /**
   * Controlla se il FormControl il cui nome è passato come parametro non è valido.
   *
   * @public
   * @param {keyof ɵTypedOrUntyped<T, T, Record<string, AbstractControl>>} controlName
   * @returns {boolean}
   */
  public isControlInvalid(controlName: keyof ɵTypedOrUntyped<T, T, Record<string, AbstractControl>>): boolean {
    return this.formGroup.controls[controlName].invalid;
  }

  /**
   * Emette l'evento di click sul pulsante di submit, con l'eventuale parametro passato.
   *
   * @public
   * @param {?E} [arg]
   */
  public emit(arg?: E) {
    if (arg) {
      this.submit.emit(arg);
    } else {
      this.submit.emit();
    }
  }
}
