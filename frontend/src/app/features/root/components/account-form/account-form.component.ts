import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AbstractFormComponent} from 'src/app/abstract/components/abstract-form-component';
import {filterAccountIds, getUUIDErrorMessage} from 'src/app/shared/functions/shared.functions';

import {FormInterface} from '../../models/form.interface';

@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent extends AbstractFormComponent<FormInterface> implements OnInit {
  @Input()
  public accountIds: string[] = [];

  public filteredAccountIds$!: Observable<string[]>;

  public get errorMessage() {
    const {invalid, errors} = this.formGroup.controls.accountId;
    if (invalid && errors) {
      return getUUIDErrorMessage(errors);
    }
    return '';
  }

  public ngOnInit() {
    this.filteredAccountIds$ = this.formGroup.controls.accountId.valueChanges.pipe(
      map(value => filterAccountIds(value, this.accountIds)),
    );
  }
}
