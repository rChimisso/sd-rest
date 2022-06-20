import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Nullable} from 'src/app/core/models/nullable.type';
import {ResponseBody} from 'src/app/core/models/responses/response-body.interface';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public data: HttpErrorResponse) {}

  public getErrorMessage(error: Nullable<ResponseBody<string>>, defaultMessage: string) {
    return error ? error.message : defaultMessage;
  }
}
