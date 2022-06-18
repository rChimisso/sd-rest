import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {TwoDigitDecimalNumberDirective} from 'src/app/core/directives/TwoDigitDecimalNumberDirective.directive';

import {TransferFormComponent} from './components/transfer-form/transfer-form.component';
import {TransferResultDialogComponent} from './components/transfer-result-dialog/transfer-result-dialog.component';
import {TransferContainerComponent} from './container/transfer-container.component';
import {transferFeatureKey} from './redux';
import {TransferEffects} from './redux/transfer.effects';
import {transferReducer} from './redux/transfer.reducers';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forFeature(transferFeatureKey, transferReducer),
    EffectsModule.forFeature([TransferEffects])
  ],
  declarations: [
    TransferContainerComponent,
    TransferResultDialogComponent,
    TransferFormComponent,
    TwoDigitDecimalNumberDirective
  ]
})
export class TransferModule {}
