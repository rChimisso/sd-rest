import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, of, switchMap} from 'rxjs';

import {Account} from 'src/app/core/models/account.interface';
import {Movement} from 'src/app/core/models/movement.type';
import {handleError} from 'src/app/core/redux/core.actions';
import {ApiService} from 'src/app/core/services/api-service.service';

import {retrieveAccountData, saveAccount, saveHistory} from './root.actions';

const mockAccountData: {
  account: Account;
  history: Movement[];
} = {
  account: {
    id: '12345678901234567890',
    balance: 10,
    name: 'Test',
    surname: 'Von Tester'
  },
  history: [
    {
      accountId: '12345678901234567890',
      amount: 20,
      date: new Date('2022/06/15'),
      id: '123456789012345678901234567890ab'
    },
    {
      accountId: '12345678901234567890',
      amount: -10,
      date: new Date('2022/06/17'),
      id: '123456789012345678901234567890cd'
    },
    {
      accountId: '12345678901234567890',
      amount: 0,
      date: new Date('2022/06/16'),
      id: '123456789012345678901234567890ef'
    }
  ]
};

@Injectable()
export class RootEffects {
  public retrieveAccountData$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveAccountData),
    // TODO: call service
    switchMap(() => this.apiService.mockCall(mockAccountData).pipe(
      switchMap(({account, history}) => [saveAccount({account}), saveHistory({history})]),
      catchError(error => of(handleError({error})))
    ))
  ));

  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
