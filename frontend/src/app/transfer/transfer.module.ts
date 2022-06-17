import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {TransferComponent} from './container/transfer.component';
import {reducers, transferFeatureKey} from './redux';
import {TransferEffects} from './redux/transfer.effects';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    StoreModule.forFeature(transferFeatureKey, reducers),
    EffectsModule.forFeature([TransferEffects])
  ],
  declarations: [TransferComponent]
})
export class TransferModule {}
