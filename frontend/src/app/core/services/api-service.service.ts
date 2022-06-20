import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {catchError, finalize, map, Observable, take} from 'rxjs';

import {State} from 'src/app/features/app-overlay/redux/app-overlay.reducers';

import {updateLoader} from '../../features/app-overlay/redux/app-overlay.actions';
import {Account} from '../models/account.interface';
import {Movement} from '../models/movement.type';
import {TransferResponseBody} from '../models/transfer-response-body.interface';

interface AccountData {
  account: Account;
  history: (Movement & {date: string})[];
}

@Injectable()
export class ApiService {
  public constructor(private readonly httpClient: HttpClient, private readonly appState$: Store<State>) {}

  public getAccount(): Observable<Account[]> {
    return this.get<Account[]>('account');
  }

  public getAccountId(id: string): Observable<AccountData> {
    return this.get<AccountData>(`account/${id}`);
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
      take(1),
      map(response => response),
      catchError(error => {
        throw error;
      }),
      finalize(this.finalize)
    );
  }

  private post<T>(endpoint: string, body: unknown): Observable<T> {
    this.initialize();
    return this.httpClient.post<T>(`http://localhost:8080/api/${endpoint}`, body).pipe(
      take(1),
      map(response => response),
      catchError(error => {
        throw error;
      }),
      finalize(this.finalize)
    );
  }

  private initialize() {
    this.appState$.dispatch(updateLoader({showLoader: true}));
  }

  private finalize() {
    this.appState$.dispatch(updateLoader({showLoader: false}));
  }
}
