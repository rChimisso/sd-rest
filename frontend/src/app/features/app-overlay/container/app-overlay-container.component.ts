import {HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Nullable} from 'src/app/core/models/nullable.type';
import {State} from 'src/app/core/redux/core.reducers';
import {ErrorDialogComponent} from 'src/app/features/app-overlay/components/error-dialog/error-dialog.component';
import {clearError} from 'src/app/features/app-overlay/redux/app-overlay.actions';

import {getError, getShowLoader} from '../redux';

/**
 * Contenitore degli overlay comuni a tutte le pagine dell'applicazione.
 *
 * @export
 * @class AppOverlayContainerComponent
 * @typedef {AppOverlayContainerComponent}
 */
@Component({
  selector: 'app-overlay-container',
  templateUrl: './app-overlay-container.component.html',
  styleUrls: ['./app-overlay-container.component.scss']
})
export class AppOverlayContainerComponent {
  /**
   * Observable dell'eventuale errore HTTP.
   *
   * @private
   * @readonly
   * @type {Observable<Nullable<HttpErrorResponse>>}
   */
  private readonly error$: Observable<Nullable<HttpErrorResponse>> = this.appState$.select(getError);

  /**
   * Observable della flag che indica se mostrare il Loader.
   *
   * @public
   * @readonly
   * @type {Observable<boolean>}
   */
  public readonly showLoader$: Observable<boolean> = this.appState$.select(getShowLoader);

  /**
   * @constructor
   * @public
   * @param {Store<State>} appState$
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {MatDialog} dialog
   */
  public constructor(private readonly appState$: Store<State>, private readonly router: Router, private readonly route: ActivatedRoute, private readonly dialog: MatDialog) {
    this.error$.subscribe(error => {
      if (error) {
        this.dialog.open(ErrorDialogComponent, {data: error}).afterClosed().subscribe(() => this.appState$.dispatch(clearError()));
      }
    });
  }

  /**
   * Naviga verso la pagina home.
   *
   * @public
   */
  public navigateHome() {
    this.router.navigate(['home'], {relativeTo: this.route.root});
  }
}
