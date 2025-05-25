import { Injectable } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastComponent?: ToastComponent;

  registerToastComponent(toastComponent: ToastComponent) {
    this.toastComponent = toastComponent;
  }

  showPrimary(message: string) {
    this.toastComponent?.show(message, 'primary');
  }

  showSecondary(message: string) {
    this.toastComponent?.show(message, 'secondary');
  }

  showSuccess(message: string) {
    this.toastComponent?.show(message, 'success');
  }

  showWarning(message: string) {
    this.toastComponent?.show(message, 'warning');
  }

  showError(message: string) {
    this.toastComponent?.show(message, 'danger');
  }
}