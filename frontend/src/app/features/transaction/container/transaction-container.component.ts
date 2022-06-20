import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AbstractFormContainer} from 'src/app/abstract/containers/abstract-form-container';
import {UUID_VALIDATORS} from 'src/app/core/constants/constants';
import {Nullable} from 'src/app/core/models/nullable.type';
import {TransactionResponseBody} from 'src/app/core/models/responses/transaction-response-body.interface';
import {clearData} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';

import {FormInterface} from '../models/form.interface';
import {getTransactionResult} from '../redux';

@Component({
  selector: 'transaction-container',
  templateUrl: './transaction-container.component.html',
  styleUrls: ['./transaction-container.component.scss']
})
export class TransactionContainerComponent extends AbstractFormContainer<FormInterface> {
  private readonly transactionResult$: Observable<Nullable<TransactionResponseBody>> = this.appState$.select(getTransactionResult);

  public constructor(appState$: Store<State>, private readonly dialog: MatDialog) {
    super(
      'transaction',
      new FormGroup({
        accountId: new FormControl(
          '',
          {
            nonNullable: true,
            validators: UUID_VALIDATORS
          }
        ),
        amount: new FormControl(
          '',
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        )
      }),
      appState$
    );
    this.transactionResult$.subscribe(transferResult => {
      if (transferResult) {
        this.dialog.open(TransferResultDialogComponent, {data: transferResult}).afterClosed().subscribe(() => this.appState$.dispatch(clearData()));
      }
    });
  }

  public perform() {
    this.appState$.dispatch(performTransfer({
      from: this.formGroup.controls.senderId.value,
      to: this.formGroup.controls.recipientId.value,
      amount: +this.formGroup.controls.amount.value
    }));
  }
}
