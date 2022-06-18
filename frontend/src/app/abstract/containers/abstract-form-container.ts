import {Component, Inject, OnDestroy} from '@angular/core';
import {AbstractControl, FormGroup, ɵTypedOrUntyped} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {getAccountIds} from 'src/app/core/redux';
import {clearData, retrieveAccountIds} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';

@Component({template: ''})
export abstract class AbstractFormContainer<T extends {[K in keyof T]: AbstractControl}> implements OnDestroy {
  public accountIds$: Observable<string[]> = this.appState$.select(getAccountIds(this.featureKey));

  public get isFormInvalid() {
    return this.formGroup.invalid;
  }

  public constructor(@Inject(String) private readonly featureKey: keyof State, protected readonly formGroup: FormGroup<T>, protected readonly appState$: Store<State>) {
    this.appState$.dispatch(retrieveAccountIds());
  }

  public ngOnDestroy() {
    this.appState$.dispatch(clearData());
  }

  public isControlInvalid(controlName: keyof ɵTypedOrUntyped<T, T, Record<string, AbstractControl>>) {
    return this.formGroup.controls[controlName].invalid;
  }
}
