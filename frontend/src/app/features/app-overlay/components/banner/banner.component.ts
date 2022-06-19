import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'xsb-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  @Output()
  public navigateHome = new EventEmitter<void>();

  public emit() {
    this.navigateHome.emit();
  }
}
