import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-toast',
  template: `
    @if (isVisible) {
      <div class="toast-container">
        <div [class]="'alert alert-' + type + ' paper toast'">
          {{ message }}
          <button class="toast-close" (click)="dismiss()">✕</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 300px;
    }

    .toast {
      padding: 15px 20px;
      margin-bottom: 15px;
      border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
      border: 2px solid !important;
      font-family: 'Gochi Hand', cursive;
      font-size: 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: slideIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      box-shadow: 5px 5px 0 rgba(0,0,0,0.1);
      position: relative;
      overflow: hidden;
    }

    /* Sobrescreve cores do PaperCSS para manter contraste */
    .alert-primary {
      background-color: #f8f9fa !important;
      border-color: #6c757d !important;
      color: #212529 !important;
    }

    .alert-secondary {
      background-color: #e9ecef !important;
      border-color: #495057 !important;
      color: #212529 !important;
    }

    .alert-success {
      background-color: #d4edda !important;
      border-color: #28a745 !important;
      color: #155724 !important;
    }

    .alert-warning {
      background-color: #fff3cd !important;
      border-color: #ffc107 !important;
      color: #856404 !important;
    }

    .alert-danger {
      background-color: #f8d7da !important;
      border-color: #dc3545 !important;
      color: #721c24 !important;
    }

    .toast-close {
      background: none;
      border: none;
      font-size: 1.3rem;
      cursor: pointer;
      margin-left: 10px;
      padding: 0 5px;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  isVisible = false;
  message = '';
  type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';

  show(message: string, type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger') {
    this.message = message;
    this.type = type;
    this.isVisible = true;
    
    setTimeout(() => this.dismiss(), type === 'danger' ? 5000 : 3000);
  }

  dismiss() {
    this.isVisible = false;
  }
}