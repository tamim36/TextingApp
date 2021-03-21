import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor (
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  private iconsPath: string = '../../../assets/icons';

  loadIcons(iconList: string[]) {
    this.registerIcons(iconList);
  }

  private registerIcons(icons: string[]): void {
    icons.forEach((icon) => {
      this.iconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `${this.iconsPath}/${icon}.svg`
        )
      );
    });
  }
}
