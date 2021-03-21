import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../service/preloader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader-container.component.html',
  styleUrls: ['./app-loader-container.component.scss'],
})
export class AppLoaderContainerComponent implements OnInit {
  isLoading: boolean = false;
  loaderSubscription: Subscription;
  constructor(private appLoader: PreloaderService) {}

  ngOnInit(): void {
    this.loaderSubscription = this.appLoader.loaderListener.subscribe(
      (status) => {
        this.isLoading = status;
      }
    );
  }
  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }
}
