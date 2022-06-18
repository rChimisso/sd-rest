import {AbstractControl, FormGroup, ɵTypedOrUntyped} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {getAccountIds} from 'src/app/core/redux';
import {retrieveAccountIds} from 'src/app/core/redux/core.actions';
import {State} from 'src/app/core/redux/core.reducers';

export abstract class AbstractContainer<T extends {[K in keyof T]: AbstractControl}> {
  public accountIds$: Observable<string[]> = this.appState$.select(getAccountIds(this.featureKey));

  public get isFormInvalid() {
    return this.formGroup.invalid;
  }

  public constructor(private readonly featureKey: keyof State, protected readonly formGroup: FormGroup<T>, protected readonly appState$: Store<State>) {
    this.appState$.dispatch(retrieveAccountIds());
  }

  public isControlInvalid(controlName: keyof ɵTypedOrUntyped<T, T, Record<string, AbstractControl>>) {
    return this.formGroup.controls[controlName].invalid;
  }
}
