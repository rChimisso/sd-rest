import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AbstractFormContainer} from 'src/app/abstract/containers/abstract-form-container';
import {UUID_VALIDATORS} from 'src/app/core/constants/constants';
import {Nullable} from 'src/app/core/models/nullable.type';
import {TransferResponseBody} from 'src/app/core/models/responses/transfer-response-body.interface';
import {clearData} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';
import {MovementResultDialogComponent} from 'src/app/shared/components/movement-result-dialog/movement-result-dialog.component';

import {FormInterface} from '../models/form.interface';
import {getTransferResult} from '../redux';
import {performTransfer} from '../redux/transfer.actions';

/**
 * Container per la richiesta di Trasferimento.
 *
 * @export
 * @class TransferContainerComponent
 * @typedef {TransferContainerComponent}
 * @extends {AbstractFormContainer<FormInterface>}
 */
@Component({
  selector: 'transfer-container',
  templateUrl: './transfer-container.component.html',
  styleUrls: ['./transfer-container.component.scss']
})
export class TransferContainerComponent extends AbstractFormContainer<FormInterface> {
  /**
   * Observable del risultato della Response per la richiesta di creazione di Trasferimento.
   *
   * @private
   * @readonly
   * @type {Observable<Nullable<TransferResponseBody>>}
   */
  private readonly transferResult$: Observable<Nullable<TransferResponseBody>> = this.appState$.select(getTransferResult);

  /**
   * @constructor
   * @public
   * @param {Store<State>} appState$
   * @param {MatDialog} dialog
   */
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
          '',
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        )
      }),
      appState$
    );
    this.transferResult$.pipe(this.takeUntil()).subscribe(transferResult => {
      if (transferResult) {
        this.dialog.open(
          MovementResultDialogComponent<TransferResponseBody>,
          {data: transferResult}
        ).afterClosed().pipe(this.takeUntil()).subscribe(() => this.appState$.dispatch(clearData()));
      }
    });
  }

  /**
   * Dispatcha la action {@link performTransfer} per attivare la richiesta di Trasferimento.
   *
   * @public
   */
  public perform() {
    this.appState$.dispatch(performTransfer({
      from: this.formGroup.controls.senderId.value,
      to: this.formGroup.controls.recipientId.value,
      amount: +this.formGroup.controls.amount.value
    }));
  }
}
