import { Injectable, Renderer2, RendererFactory2, ViewContainerRef } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { RootLineToasterComponent } from '../components/root-line-toaster/root-line-toaster.component';

@Injectable()
export class RootLineToasterService {
  ref:MatSnackBarRef<RootLineToasterComponent>;
  renderer:Renderer2;
  private panelClasses:string[]=["snack-style"]
  constructor(private snackbar:MatSnackBar) { 
  }

  openSnackbar(cRef:ViewContainerRef){
    this.toastThemeHandler();
    this.ref = this.snackbar.openFromComponent(RootLineToasterComponent,{
        duration:20000,
        horizontalPosition:"end",
        verticalPosition:"bottom",
        announcementMessage:"Hello snackbar",
        panelClass:this.panelClasses
      })
  }

  toastThemeHandler(color:string="#650691"){
    let toastStyle = document.createElement("style");
    toastStyle.type = "text/css";
    toastStyle.innerHTML = `.snack-style{background:${color}}`
    document.getElementsByTagName('head')[0].appendChild(toastStyle);
  }

  dismis() {
    if (this.ref) {
      this.ref.dismiss();
    }
  }
}
