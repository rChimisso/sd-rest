import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {SHORT_UUID_LENGTH, UUID_REGEX} from 'src/app/core/constants/constants';

import {getAccountIds, TransferState} from '../redux';
import {performTranfer, retrieveAccountIds} from '../redux/transfer.actions';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  public accountIds$: Observable<string[]> = this.appState$.select(getAccountIds);

  public readonly transferForm: FormGroup<{
    senderId: FormControl<string>;
    recipientId: FormControl<string>;
    amount: FormControl<number>;
  }>;

  public get isSenderIdInvalid() {
    return this.transferForm.controls.senderId.invalid;
  }

  public get isRecipientIdInvalid() {
    return this.transferForm.controls.recipientId.invalid;
  }

  public get isAmountInvalid() {
    return this.transferForm.controls.amount.invalid;
  }

  public get senderErrorMessage() {
    const {invalid, errors} = this.transferForm.controls.senderId;
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

  public get recipientErrorMessage() {
    const {invalid, errors} = this.transferForm.controls.recipientId;
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

  public get amountErrorMessage() {
    const {invalid, errors} = this.transferForm.controls.amount;
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

  public get isFormInvalid() {
    return this.transferForm.invalid;
  }

  public constructor(private readonly appState$: Store<TransferState>) {
    this.appState$.dispatch(retrieveAccountIds());
    this.transferForm = new FormGroup({
      senderId: new FormControl(
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
      ),
      recipientId: new FormControl(
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
      ),
      amount: new FormControl(
        0,
        {
          nonNullable: true,
          validators: [Validators.min(0), Validators.required]
        }
      )
    });
  }

  public perform() {
    this.appState$.dispatch(performTranfer({
      from: this.transferForm.controls.senderId.value,
      to: this.transferForm.controls.recipientId.value,
      amount: this.transferForm.controls.amount.value
    }));
  }
}
