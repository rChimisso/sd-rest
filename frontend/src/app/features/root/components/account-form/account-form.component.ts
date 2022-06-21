import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AbstractFormComponent} from 'src/app/abstract/components/abstract-form-component';
import {filterAccountIds, getUUIDErrorMessage} from 'src/app/shared/functions/shared.functions';

import {FormInterface} from '../../models/form.interface';

/**
 * Componente con il FormGroup per l'inserimento dell'UUID di un Account.
 *
 * @export
 * @class AccountFormComponent
 * @typedef {AccountFormComponent}
 * @extends {AbstractFormComponent<FormInterface>}
 * @implements {OnInit}
 */
@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent extends AbstractFormComponent<FormInterface> implements OnInit {
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
   * Messaggio di errore per l'input dell'id dell'Account.
   *
   * @public
   * @readonly
   * @type {string}
   */
  public get errorMessage() {
    const {invalid, errors} = this.formGroup.controls.accountId;
    if (invalid && errors) {
      return getUUIDErrorMessage(errors);
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
