import { Component, Input, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationService } from './validation.service';

@Component({
  selector: 'campuscalendar-validation-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <small *ngIf="isInvalidControl()">
      {{ getErrorMessage() }}
    </small>
  `,
  styles: [
    `
      small {
        color: red;
      }
    `,
  ],
})
export class ValidationMessageComponent {
  @Input() formGroup?: FormGroup;
  @Input() controlName?: string;
  @Input() displayName?: string;

  private validationService = inject(ValidationService);

  isInvalidControl(): boolean {
    if (!this.controlName) return true;
    const control = this.formGroup?.get(this.controlName);
    if (!control) return true;
    return control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(): string {
    if (!this.controlName) return '';
    const control = this.formGroup?.get(this.controlName);
    if (!control || !this.displayName || !this.formGroup) {
      //throw error invalid inputs
      throw new Error('Invalid inputs');
    }
    return control
      ? this.validationService.getErrorMessage(
          this.formGroup,
          this.controlName,
          this.displayName
        )
      : '';
  }
}
