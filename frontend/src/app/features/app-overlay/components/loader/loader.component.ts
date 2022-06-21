import {Component} from '@angular/core';

/**
 * Loader per il blocco dell'applicazione e la comparsa di un Progress Spinner nell'attesa che tutte le chiamate HTTP vengano concluse.
 *
 * @export
 * @class LoaderComponent
 * @typedef {LoaderComponent}
 */
@Component({
  selector: 'xsb-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {}
