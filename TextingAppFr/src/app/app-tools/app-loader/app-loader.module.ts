import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoaderDesignComponent } from './app-loader-design/app-loader-design.component';
import { AppLoaderContainerComponent } from './app-loader-container/app-loader-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppLoaderDesignComponent, AppLoaderContainerComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [AppLoaderContainerComponent],
})
export class AppLoaderModule {}
