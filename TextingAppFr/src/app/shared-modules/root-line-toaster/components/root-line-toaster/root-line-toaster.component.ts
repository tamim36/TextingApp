import { Component, Host, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBarContainer, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root-line-toaster',
  templateUrl: './root-line-toaster.component.html',
  styleUrls: ['./root-line-toaster.component.scss']
})
export class RootLineToasterComponent implements OnInit {

  constructor(private snackbarRef:MatSnackBarRef<RootLineToasterComponent>,private render:Renderer2) { }

  ngOnInit(): void {

  }
}
