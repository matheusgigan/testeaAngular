import { Component, ViewChild } from '@angular/core';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  selector: 'app-root',
  template: `
    <app-toast></app-toast>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(private toastService: ToastService) {}

  ngAfterViewInit() {
    this.toastService.registerToastComponent(this.toastComponent);
  }
}