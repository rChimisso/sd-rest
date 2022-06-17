import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {SHORT_UUID_LENGTH, UUID_REGEX} from '../core/constants/constants';
import {Account} from '../core/types/Account.interface';
import {Nullable} from '../core/types/Nullable.type';
import {Transaction} from '../core/types/Transaction.interface';
import {Transfer} from '../core/types/Transfer.interface';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  public ids = ['12345678901234567890', 'adf345678abc345de54f'];

  public account: Nullable<Account> = null;

  public history: Nullable<(Transaction | Transfer)[]> = null;

  public columns = [
    'id',
    'amount',
    'date',
    'otherAccount'
  ];

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

  public research() {
    // TODO: Dispatch action
    this.account = {
      id: this.accountForm.controls.accountId.value,
      balance: 10,
      name: 'Test',
      surname: 'Von Tester'
    };
    this.history = [
      {
        accountId: this.accountForm.controls.accountId.value,
        amount: 20,
        date: new Date('2022/06/17'),
        id: '123456789012345678901234567890ab'
      },
      {
        accountId: this.accountForm.controls.accountId.value,
        amount: -10,
        date: new Date('2022/06/15'),
        id: '123456789012345678901234567890cd'
      },
      {
        accountId: this.accountForm.controls.accountId.value,
        amount: 0,
        date: new Date('2022/06/15'),
        id: '123456789012345678901234567890ef'
      }
    ];
  }

  public getOtherAccount(element: Transaction | Transfer) {
    if ('to' in element && element.to !== this.account?.id) {
      return element.to;
    }
    if ('from' in element && element.from !== this.account?.id) {
      return element.from;
    }
    return '-';
  }
}
