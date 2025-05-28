import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Adicione esta linha
import { OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tela-pomodoro',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './tela-pomodoro.component.html',
  styleUrl: './tela-pomodoro.component.css'
})
export class TelaPomodoroComponent {
  nomeRotina = '';
  tempoPadrao = 25 * 60;
  tempoRestante = this.tempoPadrao;
  status: 'parado' | 'iniciado' | 'pausado' = 'parado';
  private intervalId: any = null;
  mensagemConcluida: boolean = false;
  diasConcluidos: number = 0;
  meta: number = 0;

  constructor(
    private toast: ToastService,
    private router: Router
  ){}

  iniciar() {
    if (this.status !== 'iniciado') {
      this.status = 'iniciado';
      this.intervalId = setInterval(() => {
    if (this.tempoRestante > 0) {
      this.tempoRestante--;
    } else {
      this.pararTimer();
      this.status = 'parado';
      this.finalizarRotina(); // <-- aqui!
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

  ngOnInit() {
    const rotina = JSON.parse(localStorage.getItem('rotinaSelecionada') || 'null');
    if (rotina) {
      this.nomeRotina = rotina.nome;
      this.tempoPadrao = rotina.tempo * 60; // tempo em minutos para segundos
      this.tempoRestante = this.tempoPadrao;
      this.diasConcluidos = rotina.diasConcluidos;
      this.meta = rotina.meta;
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

  getXp(): number {
  const usuario = localStorage.getItem('usuarioLogado') || '';
  return Number(localStorage.getItem(`xp_${usuario}`)) || 0;
}

  addXp(qtd: number) {
    const usuario = localStorage.getItem('usuarioLogado') || '';
    let xp = this.getXp();
    xp += qtd;
    localStorage.setItem(`xp_${usuario}`, xp.toString());
  }

  getLevel(): number {
    return Math.floor(this.getXp() / 100) + 1;
  }

  getLevelProgress(): number {
    return this.getXp() % 100;
  }

  getLevelProgressPercent(): number {
    return (this.getLevelProgress() / 100) * 100;
  }

  private finalizarRotina() {
  const rotinaSelecionada = JSON.parse(localStorage.getItem('rotinaSelecionada') || 'null');
  if (rotinaSelecionada && rotinaSelecionada.usuarioEmail) {
    const chave = `rotinas_${rotinaSelecionada.usuarioEmail}`;
    let rotinas = JSON.parse(localStorage.getItem(chave) || '[]');
    const index = rotinas.findIndex((r: any) => r.nome === rotinaSelecionada.nome);
    if (index !== -1) {
      rotinas[index].diasConcluidos = (rotinas[index].diasConcluidos || 0) + 1;
      if (rotinas[index].diasConcluidos >= rotinas[index].meta) {
        rotinas[index].status = 'concluido';
        this.mensagemConcluida = true;
      }
      localStorage.setItem(chave, JSON.stringify(rotinas));
    }
  }
    const xpGanho = 20; // Defina quanto XP por rotina
    this.addXp(xpGanho);
    this.toast.showSuccess(`Parabéns! Você ganhou ${xpGanho} XP!`);
    setTimeout(() => {
          this.router.navigate(['/telaInicial']);
        }, 2000);
  }

  getProgressPercentage(): number {
  if (this.meta === 0) return 0;
  return Math.round((this.diasConcluidos / this.meta) * 100);
  }
 // Script para alternar o modo escuro

  darkModeAtivo = false;

alternarDarkMode() {
  this.darkModeAtivo = !this.darkModeAtivo;
  if (this.darkModeAtivo) {
    document.body.classList.add('dark-mode-paper');
  } else {
    document.body.classList.remove('dark-mode-paper');
  }
}


}
  
