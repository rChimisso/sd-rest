import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MovementResponseBody} from 'src/app/core/models/responses/movement-response-body.interface';

/**
 * Dialog di conferma dell'avvenuto Movimento.
 *
 * @export
 * @class MovementResultDialogComponent
 * @typedef {MovementResultDialogComponent}
 */
@Component({
  selector: 'movement-result-dialog',
  templateUrl: './movement-result-dialog.component.html',
  styleUrls: ['./movement-result-dialog.component.scss']
})
export class MovementResultDialogComponent<T extends MovementResponseBody<string>> {
  /**
   * @constructor
   * @public
   * @param {MovementResponseBody} data
   */
  public constructor(@Inject(MAT_DIALOG_DATA) public data: T) {}
}
