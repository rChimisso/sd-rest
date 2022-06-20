import {Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatInput} from '@angular/material/input';

import {specialKeys, SHORT_UUID_LENGTH, STANDARD_UUID_LENGTH} from 'src/app/core/constants/constants';

@Directive({selector: '[uuid]'})
export class UUIDDirective implements OnChanges {
  @Input()
  public length!: typeof SHORT_UUID_LENGTH | typeof STANDARD_UUID_LENGTH;

  private regex = new RegExp(`^[a-fA-F0-9]{0,${this.length}}$`, 'g');

  public constructor(private readonly el: ElementRef<MatInput>) {}

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (!specialKeys.includes(event.key) && !(this.el.nativeElement.value + event.key).match(this.regex)) {
      event.preventDefault();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['length'] && changes['length'].currentValue !== changes['length'].previousValue) {
      this.regex = new RegExp(`^[a-fA-F0-9]{0,${this.length}}$`, 'g');
    }
  }
}
