import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {Account} from 'src/app/core/models/account.interface';

@Component({
  selector: 'accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent implements AfterViewInit, OnChanges {
  @Input()
  public accounts!: Account[];

  @Input()
  public showDeleted = false;

  @Output()
  public flagChange: EventEmitter<MatCheckboxChange> = new EventEmitter<MatCheckboxChange>();

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public dataSource = new MatTableDataSource<Account>(this.accounts);

  public columns: (keyof Account)[] = [
    'uuid',
    'name',
    'surname',
    'balance'
  ];

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['accounts'] && changes['accounts'].currentValue !== changes['accounts'].previousValue) {
      this.dataSource.data = this.accounts;
    }
    if (changes['showDeleted'] && changes['showDeleted'].currentValue !== changes['showDeleted'].previousValue) {
      if (this.showDeleted) {
        this.columns.push('deleted');
      } else {
        this.columns = this.columns.filter(column => column !== 'deleted');
      }
    }
  }

  public getBalanceClass(account: Account) {
    const {balance} = account;
    let type = 'neutral';
    if (balance !== 0) {
      if (balance > 0) {
        type = 'positive';
      } else {
        type = 'negative';
      }
    }
    return `xsb-balance-${type}`;
  }

  public emit(event: MatCheckboxChange) {
    this.flagChange.emit(event);
  }
}
