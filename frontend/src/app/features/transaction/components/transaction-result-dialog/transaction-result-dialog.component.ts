import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TransactionResponseBody} from 'src/app/core/models/responses/transaction-response-body.interface';

/**
 * Dialog di conferma dell'avvenuta Transazione.
 *
 * @export
 * @class TransactionResultDialogComponent
 * @typedef {TransactionResultDialogComponent}
 */
@Component({
  selector: 'transaction-result-dialog',
  templateUrl: './transaction-result-dialog.component.html',
  styleUrls: ['./transaction-result-dialog.component.scss']
})
export class TransactionResultDialogComponent {
  /**
   * @constructor
   * @public
   * @param {TransactionResponseBody} data
   */
  public constructor(@Inject(MAT_DIALOG_DATA) public data: TransactionResponseBody) {}
}
