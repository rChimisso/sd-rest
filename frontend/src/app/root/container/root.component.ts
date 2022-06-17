import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {SHORT_UUID_LENGTH, UUID_REGEX} from 'src/app/core/constants/constants';
import {Account} from 'src/app/core/models/account.interface';
import {Movement} from 'src/app/core/models/movement.type';
import {Nullable} from 'src/app/core/models/nullable.type';

import {getAccount, getHistory, RootState} from '../redux';
import {retrieveAccountData} from '../redux/root.actions';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  public ids = ['12345678901234567890', 'adf345678abc345de54f'];

  public account$: Observable<Nullable<Account>> = this.appState$.select(getAccount);

  public history$: Observable<Nullable<Movement[]>> = this.appState$.select(getHistory);

  public readonly columns = [
    'id',
    'amount',
    'date',
    'sender',
    'recipient'
  ];

  public readonly accountForm: FormGroup<{
    accountId: FormControl<string>;
  }>;

  public get isAccountIdInvalid() {
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

  public constructor(private readonly appState$: Store<RootState>) {
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
    this.appState$.dispatch(retrieveAccountData({accountId: this.accountForm.controls.accountId.value}));
  }
}
