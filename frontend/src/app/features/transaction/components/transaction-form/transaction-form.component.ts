import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AbstractFormComponent} from 'src/app/abstract/components/abstract-form-component';
import {filterAccountIds, getUUIDErrorMessage} from 'src/app/shared/functions/shared.functions';

import {FormInterface} from '../../models/form.interface';

/**
 * Componente con il FormGroup per l'inserimento dei dati per la richiesta di creazione di una Transazione.
 *
 * @export
 * @class TransactionFormComponent
 * @typedef {TransactionFormComponent}
 * @extends {AbstractFormComponent<FormInterface>}
 * @implements {OnInit}
 */
@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent extends AbstractFormComponent<FormInterface> implements OnInit {
  /**
   * Lista degli id di account validi.
   *
   * @public
   * @type {string[]}
   */
  @Input()
  public accountIds: string[] = [];

  /**
   * Observable della lista degli account id filtrati.
   *
   * @public
   * @type {!Observable<string[]>}
   */
  public filteredAccountIds$!: Observable<string[]>;

  /**
   * Messaggio di errore per l'input dell'id dell'account.
   *
   * @public
   * @readonly
   * @type {string}
   */
  public get idErrorMessage() {
    const {invalid, errors} = this.formGroup.controls.accountId;
    if (invalid && errors) {
      return getUUIDErrorMessage(errors);
    }
    return '';
  }

  /**
   * Messaggio di errore per l'input dell'ammontare della Transazione.
   *
   * @public
   * @readonly
   * @type {("L'ammontare è richiesto." | "")}
   */
  public get amountErrorMessage() {
    const {invalid, errors} = this.formGroup.controls.amount;
    if (invalid && errors && errors['required']) {
      return 'L\'ammontare è richiesto.';
    }
    return '';
  }

  /**
   * Metodo del ciclo di vita di Angular.  
   * Gestisce l'inizializzazione del componente.
   *
   * @public
   */
  public ngOnInit() {
    this.filteredAccountIds$ = this.formGroup.controls.accountId.valueChanges.pipe(
      map(value => filterAccountIds(value, this.accountIds)),
    );
  }
}
