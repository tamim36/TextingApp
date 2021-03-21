import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationStatusComponent } from './components/confirmation-status/confirmation-status.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmationStatusService } from './services/confirmation-status.service';
import {
  DefaultConfig,
  CONFIRMATION_MODAL_CONFIG,
  ModalConfig,
} from './configs/modal.config';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const DefaultComponentConfig: Partial<ModalConfig> = {
  ...DefaultConfig,
};

@NgModule({
  declarations: [ConfirmationStatusComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
  ],
  providers: [ConfirmationStatusService],
  entryComponents: [ConfirmationStatusComponent],
})
export class ConfirmationStatusModalModule {
  static forChild(config: Partial<ModalConfig> = {}): ModuleWithProviders {
    return {
      ngModule: ConfirmationStatusModalModule,
      providers: [
        {
          provide: CONFIRMATION_MODAL_CONFIG,
          useValue: {
            default: DefaultComponentConfig,
            config,
          },
        },
      ],
    };
  }
}
