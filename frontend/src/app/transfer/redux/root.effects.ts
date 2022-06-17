import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';

import {ApiService} from 'src/app/core/services/api-service.service';

@Injectable()
export class TransferEffects {
  public constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
