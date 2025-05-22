import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Adicione esta linha
@Component({
  selector: 'app-tela-pomodoro',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './tela-pomodoro.component.html',
  styleUrl: './tela-pomodoro.component.css'
})
export class TelaPomodoroComponent {
  tempoPadrao = 25 * 60; // 25 minutos em segundos
  tempoRestante = this.tempoPadrao;
  status: 'parado' | 'iniciado' | 'pausado' = 'parado';
  private intervalId: any = null;

  iniciar() {
    if (this.status !== 'iniciado') {
      this.status = 'iniciado';
      this.intervalId = setInterval(() => {
        if (this.tempoRestante > 0) {
          this.tempoRestante--;
        } else {
          this.pararTimer();
          this.status = 'parado';
        }
      }, 1000);
    }
  }

  pausar() {
    if (this.status === 'iniciado') {
      this.status = 'pausado';
      this.pararTimer();
    }
  }

  resetar() {
    this.status = 'parado';
    this.pararTimer();
    this.tempoRestante = this.tempoPadrao;
  }

  cancelar() {
  this.status = 'parado';
  this.pararTimer();
  this.tempoRestante = this.tempoPadrao;
  }

  private pararTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  get minutos(): string {
    return Math.floor(this.tempoRestante / 60).toString().padStart(2, '0');
  }

  get segundos(): string {
    return (this.tempoRestante % 60).toString().padStart(2, '0');
  }
}

