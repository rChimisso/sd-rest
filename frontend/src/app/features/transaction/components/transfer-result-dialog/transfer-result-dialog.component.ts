import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TransferResponseBody} from 'src/app/core/models/responses/transfer-response-body.interface';

/**
 * Dialog di conferma dell'avvenuto Trasferimento.
 *
 * @export
 * @class TransferResultDialogComponent
 * @typedef {TransferResultDialogComponent}
 */
@Component({
  selector: 'transfer-result-dialog',
  templateUrl: './transfer-result-dialog.component.html',
  styleUrls: ['./transfer-result-dialog.component.scss']
})
export class TransferResultDialogComponent {
  /**
   * @constructor
   * @public
   * @param {TransferResponseBody} data
   */
  public constructor(@Inject(MAT_DIALOG_DATA) public data: TransferResponseBody) {}
}
