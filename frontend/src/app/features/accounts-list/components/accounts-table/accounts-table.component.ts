import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {Account} from 'src/app/core/models/account.interface';
import {CurrencyClass, CurrencyStyle} from 'src/app/shared/models/currency-style.types';

/**
 * Tabella per la lista degli {@link Account}.
 *
 * @export
 * @class AccountsTableComponent
 * @typedef {AccountsTableComponent}
 * @implements {AfterViewInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent implements AfterViewInit, OnChanges {
  /**
   * Lista degli {@link Account}.
   *
   * @public
   * @type {!Account[]}
   */
  @Input()
  public accounts!: Account[];

  /**
   * Se mostrare gli {@link Account} eliminati.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public showDeleted = false;

  /**
   * Evento emesso quando il valore della checkbox per la visualizzazione degli {@link Account} eliminati cambia.
   *
   * @public
   * @type {EventEmitter<MatCheckboxChange>}
   */
  @Output()
  public flagChange: EventEmitter<MatCheckboxChange> = new EventEmitter<MatCheckboxChange>();

  /**
   * Paginatore della tabella.
   *
   * @public
   * @type {!MatPaginator}
   */
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  /**
   * Dati da mostrare nella tabella.
   *
   * @public
   * @type {MatTableDataSource<Account>}
   */
  public dataSource: MatTableDataSource<Account> = new MatTableDataSource<Account>(this.accounts);

  /**
   * Colonne della tabella.
   *
   * @public
   * @type {(keyof Account)[]}
   */
  public columns: (keyof Account)[] = [
    'uuid',
    'name',
    'surname',
    'balance'
  ];

  /**
   * Metodo del ciclo di vita di Angular.  
   * Gestisce l'inizializzazione del componente dopo che la view è stata creata.
   *
   * @public
   */
  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Metodo del ciclo di vita di Angular.  
   * Gestisce i cambiamenti dei valori in input.
   *
   * @public
   * @param {SimpleChanges} changes cambiamenti.
   */
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

  /**
   * Restituisce la classe da usare per stilizzare il bilancio.
   *
   * @public
   * @param {number} balance bilancio.
   * @returns {CurrencyClass}
   */
  public getBalanceClass(balance: number): CurrencyClass {
    let type: CurrencyStyle = 'neutral';
    if (balance !== 0) {
      if (balance > 0) {
        type = 'positive';
      } else {
        type = 'negative';
      }
    }
    return `xsb-balance-${type}`;
  }

  /**
   * Emette {@link flagChange}.
   *
   * @public
   * @param {MatCheckboxChange} event
   */
  public emit(event: MatCheckboxChange) {
    this.flagChange.emit(event);
  }
}
