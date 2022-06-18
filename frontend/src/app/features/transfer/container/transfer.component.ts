import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import {AbstractContainer} from 'src/app/abstract/containers/abstract-container';
import {UUID_VALIDATORS} from 'src/app/core/constants/constants';
import {State} from 'src/app/core/redux/core.reducers';
import {getUUIDErrorMessage} from 'src/app/shared/functions/shared.functions';

import {performTranfer} from '../redux/transfer.actions';

interface FormInterface {
  senderId: FormControl<string>;
  recipientId: FormControl<string>;
  amount: FormControl<number>;
}

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent extends AbstractContainer<FormInterface> {
  public get senderErrorMessage() {
    const {invalid, errors} = this.formGroup.controls.senderId;
    if (invalid && errors) {
      return getUUIDErrorMessage(errors);
    }
    return '';
  }

  public get recipientErrorMessage() {
    const {invalid, errors} = this.formGroup.controls.recipientId;
    if (invalid && errors) {
      return getUUIDErrorMessage(errors);
    }
    return '';
  }

  public get amountErrorMessage() {
    const {invalid, errors} = this.formGroup.controls.amount;
    if (invalid && errors) {
      const {required, min} = errors;
      if (required) {
        return 'L\'ammontare è richiesto.';
      }
      if (min) {
        return 'L\'ammontare deve essere maggiore o uguale a 0.';
      }
    }
    return '';
  }

  public constructor(appState$: Store<State>) {
    super(
      'transfer',
      new FormGroup({
        senderId: new FormControl(
          '',
          {
            nonNullable: true,
            validators: UUID_VALIDATORS
          }
        ),
        recipientId: new FormControl(
          '',
          {
            nonNullable: true,
            validators: UUID_VALIDATORS
          }
        ),
        amount: new FormControl(
          0,
          {
            nonNullable: true,
            validators: [Validators.min(0), Validators.required]
          }
        )
      }),
      appState$
    );
  }

  public perform() {
    this.appState$.dispatch(performTranfer({
      from: this.formGroup.controls.senderId.value,
      to: this.formGroup.controls.recipientId.value,
      amount: this.formGroup.controls.amount.value
    }));
  }
}
