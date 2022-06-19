import {Directive, ElementRef, HostListener} from '@angular/core';
import {MatInput} from '@angular/material/input';

import {specialKeys} from 'src/app/core/constants/constants';

@Directive({selector: '[twoDigitDecimalNumber]'})
export class TwoDigitDecimalNumberDirective {
  // Allow decimal numbers
  private readonly regex = /^\d+(\.|,)?\d{0,2}$/g;

  public constructor(private readonly el: ElementRef<MatInput>) {}

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (!specialKeys.includes(event.key) && !(this.el.nativeElement.value + event.key).match(this.regex)) {
      event.preventDefault();
    }
  }
}
