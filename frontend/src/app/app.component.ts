import {HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {ErrorDialogComponent} from './core/components/error-dialog/error-dialog.component';
import {Nullable} from './core/models/nullable.type';
import {getError, getShowLoader} from './core/redux';
import {clearError} from './core/redux/core.actions';
import {State} from './core/redux/core.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly error$: Observable<Nullable<HttpErrorResponse>> = this.appState$.select(getError);

  public readonly showLoader$: Observable<boolean> = this.appState$.select(getShowLoader);

  public constructor(private readonly appState$: Store<State>, private readonly router: Router, private readonly route: ActivatedRoute, private readonly dialog: MatDialog) {
    this.error$.subscribe(error => {
      if (error) {
        this.dialog.open(ErrorDialogComponent, {data: error}).afterClosed().subscribe(() => this.appState$.dispatch(clearError()));
      }
    });
  }

  public navigateHome() {
    this.router.navigate(['home'], {relativeTo: this.route.root});
  }
}
