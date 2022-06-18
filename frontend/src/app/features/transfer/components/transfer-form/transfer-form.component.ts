import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AbstractFormComponent} from 'src/app/abstract/components/abstract-form-component';
import {filterAccountIds, getUUIDErrorMessage} from 'src/app/shared/functions/shared.functions';

import {FormInterface} from '../../models/form.interface';

@Component({
  selector: 'transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent extends AbstractFormComponent<FormInterface> implements OnInit {
  @Input()
  public accountIds: string[] = [];

  public filteredSenderIds$!: Observable<string[]>;

  public filteredRecipientIds$!: Observable<string[]>;

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

  public ngOnInit() {
    this.filteredSenderIds$ = this.formGroup.controls.senderId.valueChanges.pipe(
      map(value => filterAccountIds(value, this.accountIds)),
    );
    this.filteredRecipientIds$ = this.formGroup.controls.recipientId.valueChanges.pipe(
      map(value => filterAccountIds(value, this.accountIds)),
    );
  }
}
