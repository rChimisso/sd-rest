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
import {MovementResultDialogComponent} from 'src/app/shared/components/movement-result-dialog/movement-result-dialog.component';

import {FormInterface} from '../models/form.interface';
import {getTransactionResult} from '../redux';
import {performTransaction} from '../redux/transaction.actions';

/**
 * Container per la richiesta di Transazione.
 *
 * @export
 * @class TransactionContainerComponent
 * @typedef {TransactionContainerComponent}
 * @extends {AbstractFormContainer<FormInterface>}
 */
@Component({
  selector: 'transaction-container',
  templateUrl: './transaction-container.component.html',
  styleUrls: ['./transaction-container.component.scss']
})
export class TransactionContainerComponent extends AbstractFormContainer<FormInterface> {
  /**
   * Observable del risultato della Response per la richiesta di creazione di Transazione.
   *
   * @private
   * @readonly
   * @type {Observable<Nullable<TransactionResponseBody>>}
   */
  private readonly transactionResult$: Observable<Nullable<TransactionResponseBody>> = this.appState$.select(getTransactionResult);

  /**
   * @constructor
   * @public
   * @param {Store<State>} appState$
   * @param {MatDialog} dialog
   */
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
    this.transactionResult$.pipe(this.takeUntil()).subscribe(transferResult => {
      if (transferResult) {
        this.dialog.open(
          MovementResultDialogComponent<TransactionResponseBody>,
          {data: transferResult}
        ).afterClosed().pipe(this.takeUntil()).subscribe(() => this.appState$.dispatch(clearData()));
      }
    });
  }

  /**
   * Dispatcha la action {@link performTransaction} per attivare la richiesta di Transazione.
   *
   * @public
   */
  public perform() {
    this.appState$.dispatch(performTransaction({
      accountId: this.formGroup.controls.accountId.value,
      amount: +this.formGroup.controls.amount.value
    }));
  }
}
