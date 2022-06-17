import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {TransferState} from '../redux';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  public constructor(private readonly appState$: Store<TransferState>) {}
}
