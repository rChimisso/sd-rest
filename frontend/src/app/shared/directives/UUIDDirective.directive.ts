import {Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatInput} from '@angular/material/input';

import {specialKeys, SHORT_UUID_LENGTH, STANDARD_UUID_LENGTH} from 'src/app/core/constants/constants';

/**
 * Direttiva per il corretto inserimento di uno UUID all'interno di un input.
 *
 * @export
 * @class UUIDDirective
 * @typedef {UUIDDirective}
 * @implements {OnChanges}
 */
@Directive({selector: '[uuid]'})
export class UUIDDirective implements OnChanges {
  /**
   * Lunghezza massima dell'input.
   *
   * @public
   * @type {!(typeof SHORT_UUID_LENGTH | typeof STANDARD_UUID_LENGTH)}
   */
  @Input()
  public length!: typeof SHORT_UUID_LENGTH | typeof STANDARD_UUID_LENGTH;

  /**
   * L'{@link RegExp Espressione Regolare} per la conformità dell'input.
   *
   * @private
   * @type {RegExp}
   */
  private regex = new RegExp(`^[a-fA-F0-9]{0,${this.length}}$`, 'g');

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
    if (changes['length'] && changes['length'].currentValue !== changes['length'].previousValue) {
      this.regex = new RegExp(`^[a-fA-F0-9]{0,${this.length}}$`, 'g');
    }
  }
}
