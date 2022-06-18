import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TransferResult} from '../../models/transfer-result.interface';

@Component({
  selector: 'transfer-result-dialog',
  templateUrl: './transfer-result-dialog.component.html',
  styleUrls: ['./transfer-result-dialog.component.scss']
})
export class TransferResultDialogComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public data: TransferResult) {}
}
