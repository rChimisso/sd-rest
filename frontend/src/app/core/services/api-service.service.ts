import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Account} from '../models/account.interface';
import {Movement} from '../models/movement.type';
import {TransferResponseBody} from '../models/transfer-response-body.interface';

interface AccountData {
  account: Account;
  history: (Movement & {date: string})[];
}

@Injectable()
export class ApiService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAccount(): Observable<Account[]> {
    return this.httpClient.get<Account[]>('http://localhost:8080/api/account');
  }

  public getAccountId(id: string): Observable<AccountData> {
    return this.httpClient.get<AccountData>(`http://localhost:8080/api/account/${id}`);
  }

  public postTransfer(from: string, to: string, amount: number): Observable<TransferResponseBody> {
    return this.httpClient.post<TransferResponseBody>('http://localhost:8080/api/transfer', {
      from,
      to,
      amount
    });
  }
}
