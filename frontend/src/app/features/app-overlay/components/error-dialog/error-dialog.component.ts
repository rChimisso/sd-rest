import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Nullable} from 'src/app/core/models/nullable.type';
import {ResponseBody} from 'src/app/core/models/responses/response-body.interface';

/**
 * Dialog per la visualizzazione degli errori alle chiamate HTTP per qualunque pagina.
 *
 * @export
 * @class ErrorDialogComponent
 * @typedef {ErrorDialogComponent}
 */
@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  /**
   * @constructor
   * @public
   * @param {HttpErrorResponse} data
   */
  public constructor(@Inject(MAT_DIALOG_DATA) public data: HttpErrorResponse) {}

  /**
   * Restituisce il messaggio d'errore più appropriato.
   *
   * @public
   * @param {Nullable<ResponseBody<string>>} error
   * @param {string} defaultMessage
   * @returns {string}
   */
  public getErrorMessage(error: Nullable<ResponseBody<string>>, defaultMessage: string): string {
    return error ? error.message : defaultMessage;
  }
}
