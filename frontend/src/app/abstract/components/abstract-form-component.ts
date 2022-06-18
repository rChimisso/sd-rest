import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormGroup, ɵTypedOrUntyped} from '@angular/forms';

@Component({template: ''})
export abstract class AbstractFormComponent<T extends {[K in keyof T]: AbstractControl}, E = never> {
  @Input()
  public formGroup!: FormGroup<T>;

  @Output()
  public submit = new EventEmitter<E>();

  public get isFormInvalid() {
    return this.formGroup.invalid;
  }

  public isControlInvalid(controlName: keyof ɵTypedOrUntyped<T, T, Record<string, AbstractControl>>) {
    return this.formGroup.controls[controlName].invalid;
  }

  public emit(arg?: E) {
    if (arg) {
      this.submit.emit(arg);
    } else {
      this.submit.emit();
    }
  }
}
