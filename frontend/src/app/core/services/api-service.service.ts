import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {catchError, delay, finalize, map, Observable, throwError} from 'rxjs';

import {decrementActiveCalls, incrementActiveCalls} from '../../features/app-overlay/redux/app-overlay.actions';
import {Account} from '../models/account.interface';
import {AccountHistory} from '../models/responses/account-history-response-body.interface';
import {TransactionResponseBody} from '../models/responses/transaction-response-body.interface';
import {TransferResponseBody} from '../models/responses/transfer-response-body.interface';
import {State} from '../redux/core.reducers';

/**
 * Api Service per le chiamate HTTP.
 *
 * @export
 * @class ApiService
 * @typedef {ApiService}
 */
@Injectable()
export class ApiService {
  /**
   * Tempo di attesa prima di finalizzare una chiamata HTTP.
   *
   * @private
   * @readonly
   * @type {500}
   */
  private readonly watingTime = 500;

  /**
   * @constructor
   * @public
   * @param {HttpClient} httpClient
   * @param {Store<State>} appState$
   */
  public constructor(private readonly httpClient: HttpClient, private readonly appState$: Store<State>) {}

  /**
   * Esegue la chiamata HTTP GET all'endpoint `active`.
   *
   * @public
   * @returns {Observable<Account[]>} lista di tutti gli id degli account attivi.
   */
  public getActive(): Observable<Account[]> {
    return this.get<Account[]>('active');
  }

  /**
   * Esegue la chiamata HTTP GET all'endpoint `account`.
   *
   * @public
   * @returns {Observable<Account[]>} lista di tutti gli id degli account attivi e non.
   */
  public getAccount(): Observable<Account[]> {
    return this.get<Account[]>('account');
  }

  /**
   * Esegue la chiamata HTTP GET all'endpoint `account/{id}`.
   *
   * @public
   * @param {string} id
   * @returns {Observable<AccountHistory>} {@link AccountHistory}.
   */
  public getAccountId(id: string): Observable<AccountHistory> {
    return this.get<AccountHistory>(`account/${id}`);
  }

  /**
   * Esegue la chiamata HTTP POST all'endpoint `account/{id}`.
   *
   * @public
   * @param {string} accountId
   * @param {number} amount
   * @returns {Observable<TransactionResponseBody>}
   */
  public postAccountId(accountId: string, amount: number): Observable<TransactionResponseBody> {
    return this.post<TransactionResponseBody>(`account/${accountId}`, {amount});
  }

  /**
   * Esegue la chiamata HTTP POST all'endpoint `transfer`.
   *
   * @public
   * @param {string} from
   * @param {string} to
   * @param {number} amount
   * @returns {Observable<TransferResponseBody>}
   */
  public postTransfer(from: string, to: string, amount: number): Observable<TransferResponseBody> {
    return this.post<TransferResponseBody>('transfer', {
      from,
      to,
      amount
    });
  }

  /**
   * Effettua una chiamata GET all'endpoint passato come parametro.
   *
   * @private
   * @template T
   * @param {string} endpoint
   * @returns {Observable<T>}
   */
  private get<T>(endpoint: string): Observable<T> {
    this.initialize();
    return this.httpClient.get<T>(`http://localhost:8080/api/${endpoint}`).pipe(
      map(response => response),
      catchError(error => throwError(() => error)),
      delay(this.watingTime),
      finalize(() => this.finalize())
    );
  }

  /**
   * Effettua una chiamata POST all'endpoint passato come parametro.
   *
   * @private
   * @template T
   * @param {string} endpoint
   * @param {unknown} body
   * @returns {Observable<T>}
   */
  private post<T>(endpoint: string, body: unknown): Observable<T> {
    this.initialize();
    return this.httpClient.post<T>(`http://localhost:8080/api/${endpoint}`, body).pipe(
      map(response => response),
      catchError(error => throwError(() => error)),
      delay(this.watingTime),
      finalize(() => this.finalize())
    );
  }

  /**
   * Inizializza una chiamata HTTP.
   *
   * @private
   */
  private initialize() {
    this.appState$.dispatch(incrementActiveCalls());
  }

  /**
   * Finalizza una chiamata HTTP.
   *
   * @private
   */
  private finalize() {
    this.appState$.dispatch(decrementActiveCalls());
  }
}
