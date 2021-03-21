import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationStatusComponent } from '../components/confirmation-status/confirmation-status.component';
import {
  ModalConfig,
  CONFIRMATION_MODAL_CONFIG,
  ModalToken,
} from '../configs/modal.config';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationStatusService {
  modalConfig: Partial<ModalConfig>;
  constructor(
    private dialog: MatDialog,
    @Inject(CONFIRMATION_MODAL_CONFIG) token: ModalToken
  ) {
    this.modalConfig = {
      ...token.default,
      ...token.config,
    };
    this.modalConfig = this.verifyConfig(this.modalConfig);
  }

  private applyConfig(config: Partial<ModalConfig>): Partial<ModalConfig> {
    config = this.verifyConfig(config);

    return { ...this.modalConfig, ...config };
  }

  private verifyConfig(config: Partial<ModalConfig>): Partial<ModalConfig> {
    let verfiedConfig: Partial<ModalConfig> = { ...config };
    if (config.isLoader) {
      verfiedConfig.modalWidth = 'auto';
    }
    return verfiedConfig;
  }

  private openDialog(config: Partial<ModalConfig> = {}) {
    let dialogConfig = this.applyConfig(config);

    return this.dialog.open(ConfirmationStatusComponent, {
      width: dialogConfig.modalWidth,
      disableClose: dialogConfig.disableClose,
      panelClass: dialogConfig.panelClass,
      data: dialogConfig,
    });
  }

  openConfirmationModal(
    config: Partial<ModalConfig> = {}
  ): MatDialogRef<ConfirmationStatusComponent> {
    return this.openDialog(config);
  }
}
