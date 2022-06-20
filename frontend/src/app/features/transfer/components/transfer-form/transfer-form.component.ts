import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AbstractFormComponent} from 'src/app/abstract/components/abstract-form-component';
import {filterAccountIds, getUUIDErrorMessage} from 'src/app/shared/functions/shared.functions';

import {FormInterface} from '../../models/form.interface';

/**
 * Componente con il FormGroup per l'inserimento dei dati per la richiesta di creazione di un Trasferimento.
 *
 * @export
 * @class TransferFormComponent
 * @typedef {TransferFormComponent}
 * @extends {AbstractFormComponent<FormInterface>}
 * @implements {OnInit}
 */
@Component({
  selector: 'transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent extends AbstractFormComponent<FormInterface> implements OnInit {
  /**
   * Lista degli id di account validi.
   *
   * @public
   * @type {string[]}
   */
  @Input()
  public accountIds: string[] = [];

  /**
   * Observable della lista degli account id filtrati per il mittente.
   *
   * @public
   * @type {!Observable<string[]>}
   */
  public filteredSenderIds$!: Observable<string[]>;

  /**
   * Observable della lista degli account id filtrati per il destinatario.
   *
   * @public
   * @type {!Observable<string[]>}
   */
  public filteredRecipientIds$!: Observable<string[]>;

  /**
   * Messaggio di errore per l'input dell'id del mittente.
   *
   * @public
   * @readonly
   * @type {string}
   */
  public get senderErrorMessage(): string {
    const {invalid, errors} = this.formGroup.controls.senderId;
    if (invalid && errors) {
      return getUUIDErrorMessage(errors);
    }
    return '';
  }

  /**
   * Messaggio di errore per l'input dell'id del destinatario.
   *
   * @public
   * @readonly
   * @type {string}
   */
  public get recipientErrorMessage(): string {
    const {invalid, errors} = this.formGroup.controls.recipientId;
    if (invalid && errors) {
      return getUUIDErrorMessage(errors);
    }
    return '';
  }

  /**
   * Messaggio di errore per l'input dell'ammontare del Trasferimento.
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
    this.filteredSenderIds$ = this.formGroup.controls.senderId.valueChanges.pipe(
      map(value => filterAccountIds(value, this.accountIds)),
    );
    this.filteredRecipientIds$ = this.formGroup.controls.recipientId.valueChanges.pipe(
      map(value => filterAccountIds(value, this.accountIds)),
    );
  }
}
