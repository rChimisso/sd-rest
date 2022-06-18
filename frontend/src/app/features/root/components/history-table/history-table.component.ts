import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {Movement} from 'src/app/core/models/movement.type';
import {isTransfer} from 'src/app/shared/functions/shared.functions';

import {AmountStyle} from '../../models/amount-style.type';
import {OperationType} from '../../models/operation-type.type';

@Component({
  selector: 'history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements AfterViewInit, OnChanges {
  @Input()
  public history!: Movement[];

  @Input()
  public accoundId!: string;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public dataSource = new MatTableDataSource<Movement>(this.history);

  public readonly columns = [
    'operationType',
    'amount',
    'date',
    'sender',
    'recipient',
    'id'
  ];

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['history'] && changes['history'].currentValue !== changes['history'].previousValue) {
      this.dataSource.data = this.history;
    }
  }

  public getOperationType(movement: Movement): OperationType {
    if (isTransfer(movement)) {
      if (movement.recipient === this.accoundId) {
        return 'Trasferimento in entrata';
      }
      if (movement.sender === this.accoundId) {
        return 'Trasferimento in uscita';
      }
    }
    const {amount} = movement;
    if (amount !== 0) {
      if (amount > 0) {
        return 'Deposito';
      }
      return 'Prelievo';
    }
    return '-';
  }

  public getAmountClass(movement: Movement) {
    const {amount} = movement;
    let type: AmountStyle = 'neutral';
    if (amount !== 0) {
      if (isTransfer(movement)) {
        if (movement.recipient === this.accoundId) {
          type = 'positive';
        } else if (movement.sender === this.accoundId) {
          type = 'negative';
        }
      } else if (amount > 0) {
        type = 'positive';
      } else {
        type = 'negative';
      }
    }
    return `xsb-amount-${type}`;
  }
}
