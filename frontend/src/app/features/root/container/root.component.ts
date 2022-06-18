import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AbstractContainer} from 'src/app/abstract/containers/abstract-container';
import {UUID_VALIDATORS} from 'src/app/core/constants/constants';
import {Account} from 'src/app/core/models/account.interface';
import {Movement} from 'src/app/core/models/movement.type';
import {Nullable} from 'src/app/core/models/nullable.type';
import {State} from 'src/app/core/redux/core.reducers';
import {getUUIDErrorMessage} from 'src/app/shared/functions/shared.functions';

import {getAccount, getSortedHistory} from '../redux';
import {retrieveAccountData} from '../redux/root.actions';

interface FormInterface {
  accountId: FormControl<string>;
}

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent extends AbstractContainer<FormInterface> {
  public account$: Observable<Nullable<Account>> = this.appState$.select(getAccount);

  public history$: Observable<Nullable<Movement[]>> = this.appState$.select(getSortedHistory);

  public readonly columns = [
    'id',
    'amount',
    'date',
    'sender',
    'recipient'
  ];

  public get errorMessage() {
    const {invalid, errors} = this.formGroup.controls.accountId;
    if (invalid && errors) {
      return getUUIDErrorMessage(errors);
    }
    return '';
  }

  public constructor(appState$: Store<State>) {
    super(
      'root',
      new FormGroup({
        accountId: new FormControl(
          '',
          {
            nonNullable: true,
            validators: UUID_VALIDATORS
          }
        )
      }),
      appState$
    );
  }

  public research() {
    this.appState$.dispatch(retrieveAccountData({accountId: this.formGroup.controls.accountId.value}));
  }

  public getAmountClass(amount: number) {
    let type: string;
    if (amount > 0) {
      type = 'positive';
    } else if (amount < 0) {
      type = 'negative';
    } else {
      type = 'neutral';
    }
    return `xsb-amount-${type}`;
  }
}
