import { Inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Inject({ providedIn: 'root' })
export class GlobalDialogService {
  private static currentDialog?: DynamicDialogRef;

  static setCurrentDialog(dialog: DynamicDialogRef) {
    this.currentDialog = dialog;
  }

  static closeCurrentDialog() {
    if (this.currentDialog) {
      this.currentDialog.close();
    }
  }
}
