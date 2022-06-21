import {Component, EventEmitter, Output} from '@angular/core';

/**
 * Banner fisso dell'applicazione.
 *
 * @export
 * @class BannerComponent
 * @typedef {BannerComponent}
 */
@Component({
  selector: 'xsb-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  /**
   * Evento emesso al click sul pulsante per la navigazione alla pagina home.
   *
   * @public
   * @type {EventEmitter<void>}
   */
  @Output()
  public navigateHome: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emette {@link navigateHome}.
   *
   * @public
   */
  public emit() {
    this.navigateHome.emit();
  }
}
