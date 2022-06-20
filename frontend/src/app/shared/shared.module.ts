import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TwoDigitDecimalNumberDirective} from 'src/app/shared/directives/TwoDigitDecimalNumberDirective.directive';

import {MovementResultDialogComponent} from './components/movement-result-dialog/movement-result-dialog.component';
import {UUIDDirective} from './directives/UUIDDirective.directive';

/**
 * Shared Module.
 *
 * @export
 * @class SharedModule
 * @typedef {SharedModule}
 */
@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [
    TwoDigitDecimalNumberDirective,
    UUIDDirective,
    MovementResultDialogComponent
  ],
  exports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TwoDigitDecimalNumberDirective,
    UUIDDirective,
    MovementResultDialogComponent
  ]
})
export class SharedModule {}
