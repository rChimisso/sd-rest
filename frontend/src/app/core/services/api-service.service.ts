import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Account} from '../models/account.interface';
import {Movement} from '../models/movement.type';

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

  // TODO: remove and implements actual calls.
  public mockCall<T>(result: T) {
    return of(result);
  }
}
