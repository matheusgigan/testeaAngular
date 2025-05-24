import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XpBarComponent } from '../../shared/xp-bar/xp-bar.component'; // ajuste o caminho se necessário

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [RouterModule, XpBarComponent],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css'
})
export class TelaInicialComponent implements OnInit {
  streak: number = 0;
  username: string = '';

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('usuarioLogado') || '';
      console.log('Username:', this.username);
      this.registrarAcesso();
      this.streak = this.calcularStreak();
      console.log('Streak:', this.streak);
    }
  }

  registrarAcesso() {
    if (typeof window !== 'undefined' && window.localStorage && this.username) {
      const hoje = new Date().toISOString().slice(0, 10);
      const chave = `acessos_${this.username}`;
      let acessos: string[] = JSON.parse(localStorage.getItem(chave) || '[]');
      if (!acessos.includes(hoje)) {
        acessos.push(hoje);
        localStorage.setItem(chave, JSON.stringify(acessos));
      }
    }
  }

  calcularStreak(): number {
    if (typeof window !== 'undefined' && window.localStorage && this.username) {
      const chave = `acessos_${this.username}`;
      let acessos: string[] = JSON.parse(localStorage.getItem(chave) || '[]');
      acessos = acessos.sort().reverse();
      let streak = 0;
      let dia = new Date();
      for (const acesso of acessos) {
        const diaFormatado = dia.toISOString().slice(0, 10);
        if (acesso === diaFormatado) {
          streak++;
          dia.setDate(dia.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
    }
    return 0;
  }
}