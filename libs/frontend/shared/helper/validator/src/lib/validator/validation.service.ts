import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  getErrorMessage(
    form: FormGroup,
    controlName: string,
    displayName: string
  ): string {
    const control = form.get(controlName);
    if (!control) {
      return '';
    }
    if (control.errors?.['required']) {
      return `${displayName} est obligatoire`;
    } else if (control.errors?.['email']) {
      return `Veuillez entrer une adresse email valide`;
    } else if (control.errors?.['minlength']) {
      return `${displayName} doit contenir au minimum ${control.errors?.['minlength'].requiredLength} caractères`;
    } else if (control.errors?.['mismatchedPasswords']) {
      return 'Les mots de passe ne correspondent pas';
    }
    return '';
  }

  isInvalidControl(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    if (!control) {
      return false;
    }
    return control.invalid && (control.dirty || control.touched);
  }

  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    const mismatchedPasswords =
      password && confirmPassword && password.value !== confirmPassword.value;

    if (mismatchedPasswords) {
      // Set error on confirmPassword field
      confirmPassword?.setErrors({ mismatchedPasswords: true });

      // Mark confirmPassword as dirty
      confirmPassword?.markAsDirty();

      return { mismatchedPasswords: true };
    } else {
      // If passwords match, clear errors related to mismatch
      confirmPassword?.setErrors(null);
    }

    return null;
  }
}
