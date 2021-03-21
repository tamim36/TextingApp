import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationStatusService } from '../../services/confirmation-status.service';
import { ModalConfig } from '../../configs/modal.config';

@Component({
  selector: 'app-confirmation-status',
  templateUrl: './confirmation-status.component.html',
  styleUrls: ['./confirmation-status.component.scss'],
})
export class ConfirmationStatusComponent {
  modalConfig: Partial<ModalConfig>;
  typeColor: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) config: Partial<ModalConfig>,
    private ref: MatDialogRef<ConfirmationStatusService>
  ) {
    this.modalConfig = config;
    this.typeColor = this.setModalColor(this.modalConfig);
  }

  primaryButton(event) {
    this.modalConfig.primaryEvent(event);
    this.ref.close();
  }
  secodaryButton(event) {
    this.modalConfig.secondaryEvent(event);
    this.ref.close();
  }

  private setModalColor(config: Partial<ModalConfig>) {
    if (config.type == 'general') {
      return config.generalColor;
    } else if (config.type == 'success') {
      return config.successColor;
    } else if (config.type == 'warn') {
      return config.warnColor;
    } else if (config.type == 'error') {
      return config.errorColor;
    }
  }
}
