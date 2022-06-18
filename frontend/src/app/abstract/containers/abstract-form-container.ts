import {Component, Inject, OnDestroy} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {getAccountIds} from 'src/app/core/redux';
import {clearData, retrieveAccountIds} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';

@Component({template: ''})
export abstract class AbstractFormContainer<T extends {[K in keyof T]: AbstractControl}> implements OnDestroy {
  public accountIds$: Observable<string[]> = this.appState$.select(getAccountIds(this.featureKey));

  public constructor(@Inject(String) private readonly featureKey: keyof State, protected readonly formGroup: FormGroup<T>, protected readonly appState$: Store<State>) {
    this.appState$.dispatch(retrieveAccountIds());
  }

  public ngOnDestroy() {
    this.appState$.dispatch(clearData());
  }
}
