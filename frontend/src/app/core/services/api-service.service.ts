import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {catchError, finalize, map, Observable, throwError} from 'rxjs';

import {updateLoader} from '../../features/app-overlay/redux/app-overlay.actions';
import {Account} from '../models/account.interface';
import {AccountHistory} from '../models/responses/account-history-response-body.interface';
import {TransactionResponseBody} from '../models/responses/transaction-response-body.interface';
import {TransferResponseBody} from '../models/responses/transfer-response-body.interface';
import {State} from '../redux/core.reducers';

@Injectable()
export class ApiService {
  public constructor(private readonly httpClient: HttpClient, private readonly appState$: Store<State>) {}

  public getActive(): Observable<Account[]> {
    return this.get<Account[]>('active');
  }

  public getAccountId(id: string): Observable<AccountHistory> {
    return this.get<AccountHistory>(`account/${id}`);
  }

  public postAccountId(accountId: string, amount: number): Observable<TransactionResponseBody> {
    return this.post<TransactionResponseBody>(`account/${accountId}`, {amount});
  }

  public postTransfer(from: string, to: string, amount: number): Observable<TransferResponseBody> {
    return this.post<TransferResponseBody>('transfer', {
      from,
      to,
      amount
    });
  }

  private get<T>(endpoint: string): Observable<T> {
    this.initialize();
    return this.httpClient.get<T>(`http://localhost:8080/api/${endpoint}`).pipe(
      map(response => response),
      catchError(error => throwError(() => error)),
      finalize(this.finalize)
    );
  }

  private post<T>(endpoint: string, body: unknown): Observable<T> {
    this.initialize();
    return this.httpClient.post<T>(`http://localhost:8080/api/${endpoint}`, body).pipe(
      map(response => response),
      catchError(error => throwError(() => error)),
      finalize(this.finalize)
    );
  }

  private initialize() {
    this.appState$.dispatch(updateLoader({loading: true}));
  }

  private finalize() {
    this.appState$.dispatch(updateLoader({loading: false}));
  }
}
