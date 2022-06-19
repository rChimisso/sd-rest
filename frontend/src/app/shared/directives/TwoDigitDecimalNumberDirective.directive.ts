import {Directive, ElementRef, HostListener} from '@angular/core';
import {MatInput} from '@angular/material/input';

@Directive({selector: '[twoDigitDecimalNumber]'})
export class TwoDigitDecimalNumberDirective {
  // Allow decimal numbers
  private readonly regex = /^\d+(\.|,)?\d{0,2}$/g;

  // Allow key codes for special events.
  private readonly specialKeys: string[] = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete'
  ];

  public constructor(private readonly el: ElementRef<MatInput>) {}

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (!this.specialKeys.includes(event.key) && !(this.el.nativeElement.value + event.key).match(this.regex)) {
      event.preventDefault();
    }
  }
}
