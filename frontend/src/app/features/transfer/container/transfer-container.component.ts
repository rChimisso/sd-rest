import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AbstractFormContainer} from 'src/app/abstract/containers/abstract-form-container';
import {UUID_VALIDATORS} from 'src/app/core/constants/constants';
import {Nullable} from 'src/app/core/models/nullable.type';
import {clearData} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';

import {TransferResultDialogComponent} from '../components/transfer-result-dialog/transfer-result-dialog.component';
import {FormInterface} from '../models/form.interface';
import {TransferResult} from '../models/transfer-result.interface';
import {getTransferResult} from '../redux';
import {performTransfer} from '../redux/transfer.actions';

@Component({
  selector: 'transfer-container',
  templateUrl: './transfer-container.component.html',
  styleUrls: ['./transfer-container.component.scss']
})
export class TransferContainerComponent extends AbstractFormContainer<FormInterface> {
  private readonly transferResult$: Observable<Nullable<TransferResult>> = this.appState$.select(getTransferResult);

  public constructor(appState$: Store<State>, private readonly dialog: MatDialog) {
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
    this.transferResult$.subscribe(transferResult => {
      if (transferResult) {
        this.dialog.open(TransferResultDialogComponent, {data: transferResult}).afterClosed().subscribe(() => this.appState$.dispatch(clearData()));
      }
    });
  }

  public perform() {
    this.appState$.dispatch(performTransfer({
      from: this.formGroup.controls.senderId.value,
      to: this.formGroup.controls.recipientId.value,
      amount: this.formGroup.controls.amount.value
    }));
  }
}
