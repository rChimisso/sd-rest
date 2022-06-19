import {Directive, ElementRef, HostListener} from '@angular/core';
import {MatInput} from '@angular/material/input';

@Directive({selector: '[uuid]'})
export class UUIDDirective {
  // Allow decimal numbers
  private readonly regex = /^[a-fA-F0-9]*$/g;

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
