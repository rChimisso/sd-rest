import {Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatInput} from '@angular/material/input';

import {specialKeys} from 'src/app/core/constants/constants';

/**
 * Direttiva per il corretto inserimento di un numero decimale con massimo 2 cifre decimali all'interno di un input.
 *
 * @export
 * @class TwoDigitDecimalNumberDirective
 * @typedef {TwoDigitDecimalNumberDirective}
 */
@Directive({selector: '[twoDigitDecimalNumber]'})
export class TwoDigitDecimalNumberDirective implements OnChanges {
  /**
   * Se permettere l'inserimento di numeri negativi.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public allowNegative = true;

  /**
   * L'{@link RegExp Espressione Regolare} per la conformità dell'input.
   *
   * @private
   * @readonly
   * @type {RegExp}
   */
  private regex = this.getRegExp();

  /**
   * @constructor
   * @public
   * @param {ElementRef<MatInput>} matInput
   */
  public constructor(private readonly matInput: ElementRef<MatInput>) {}

  /**
   * Previene l'inserimento di caratteri non conformi.
   *
   * @public
   * @param {KeyboardEvent} event
   */
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (!specialKeys.includes(event.key) && !(this.matInput.nativeElement.value + event.key).match(this.regex)) {
      event.preventDefault();
    }
  }

  /**
   * Metodo del ciclo di vita di Angular.  
   * Gestisce i cambiamenti dei valori in input.
   *
   * @public
   * @param {SimpleChanges} changes cambiamenti.
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['allowNegative'] && changes['allowNegative'].currentValue !== changes['allowNegative'].previousValue) {
      this.regex = this.getRegExp();
    }
  }

  private getRegExp() {
    return this.allowNegative ? /^-?\d*\.?\d{0,2}$/g : /^\d+\.?\d{0,2}$/g;
  }
}
