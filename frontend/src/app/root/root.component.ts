import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {SHORT_UUID_LENGTH, UUID_REGEX} from '../constants/constants';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  public ids = ['12345678901234567890', 'adf345678abc345de54f'];

  public readonly accountForm: FormGroup<{
    accountId: FormControl<string>;
  }>;

  public get accountIdInvalid() {
    return this.accountForm.controls.accountId.invalid;
  }

  public get errorMessage() {
    const {invalid, errors} = this.accountForm.controls.accountId;
    if (invalid && errors) {
      const {required, pattern, minlength, maxlength} = errors;
      if (required) {
        return 'L\'ID è richiesto.';
      }
      if (minlength || maxlength) {
        const lengthError = minlength || maxlength;
        return `L'ID inserito è lungo ${lengthError.actualLength} invece di ${lengthError.requiredLength}.`;
      }
      if (pattern) {
        return 'L\'ID deve essere composto unicamente da numeri e caratteri alfabetici tra la A e la F.';
      }
    }
    return '';
  }

  public constructor() {
    this.accountForm = new FormGroup({
      accountId: new FormControl(
        '',
        {
          nonNullable: true,
          validators: [
            Validators.minLength(SHORT_UUID_LENGTH),
            Validators.maxLength(SHORT_UUID_LENGTH),
            Validators.pattern(UUID_REGEX),
            Validators.required
          ]
        }
      )
    });
  }
}
