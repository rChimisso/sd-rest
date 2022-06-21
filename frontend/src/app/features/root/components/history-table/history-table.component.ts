import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {Movement} from 'src/app/core/models/movement.type';
import {isTransfer} from 'src/app/shared/functions/guards.functions';
import {CurrencyClass, CurrencyStyle} from 'src/app/shared/models/currency-style.types';

import {OperationType} from '../../models/operation-type.type';

/**
 * Tabella per lo storico di un {@link Account}.
 *
 * @export
 * @class HistoryTableComponent
 * @typedef {HistoryTableComponent}
 * @implements {AfterViewInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements AfterViewInit, OnChanges {
  /**
   * Storico di un {@link Acocunt}.
   *
   * @public
   * @type {!Movement[]}
   */
  @Input()
  public history!: Movement[];

  /**
   * UUID dell'{@link Account}.
   *
   * @public
   * @type {!string}
   */
  @Input()
  public accountId!: string;

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
   * @type {MatTableDataSource<Movement>}
   */
  public dataSource: MatTableDataSource<Movement> = new MatTableDataSource<Movement>(this.history);

  /**
   * Colonne della tabella.
   *
   * @public
   * @readonly
   * @type {string[]}
   */
  public readonly columns: string[] = [
    'operationType',
    'amount',
    'date',
    'sender',
    'recipient',
    'id'
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
    if (changes['history'] && changes['history'].currentValue !== changes['history'].previousValue) {
      this.dataSource.data = this.history;
    }
  }

  /**
   * Restituisce il tipo dell'operazione effettuata.
   *
   * @public
   * @param {Movement} movement
   * @returns {OperationType}
   */
  public getOperationType(movement: Movement): OperationType {
    if (isTransfer(movement)) {
      if (movement.recipient === this.accountId) {
        return 'Trasferimento in entrata';
      }
      if (movement.sender === this.accountId) {
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

  /**
   * Restituisce la classe da usare per stilizzare l'ammontare.
   *
   * @public
   * @param {Movement} movement
   * @returns {string}
   */
  public getAmountClass(movement: Movement): CurrencyClass {
    const {amount} = movement;
    let type: CurrencyStyle = 'neutral';
    if (amount !== 0) {
      if (isTransfer(movement)) {
        if (movement.recipient === this.accountId) {
          type = 'positive';
        } else if (movement.sender === this.accountId) {
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
