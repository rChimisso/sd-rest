import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {HistoryTableComponent} from './components/history-table/history-table.component';
import {RootContainerComponent} from './container/root-container.component';
import {rootFeatureKey} from './redux';
import {RootEffects} from './redux/root.effects';
import {rootReducer} from './redux/root.reducers';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    StoreModule.forFeature(rootFeatureKey, rootReducer),
    EffectsModule.forFeature([RootEffects])
  ],
  declarations: [RootContainerComponent, HistoryTableComponent]
})
export class RootModule {}
