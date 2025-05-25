import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-rotinas.component.html',
  styleUrl: './criar-rotinas.component.css'
})
export class CriarRotinasComponent {
  nomeRotina = '';
  metaRotina = 1;
  tempoRotina = 1;
  tipoRotina = '';

  constructor(
    private router: Router,
    private toast: ToastService
  ) {}

  onSubmit() {
    try {
      const novaRotina = {
        nome: this.nomeRotina,
        meta: this.metaRotina,
        tempo: this.tempoRotina,
        tipo: this.tipoRotina,
        diasConcluidos: 0
      };

      const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
      if (usuario) {
        const chave = `rotinas_${usuario.email}`;
        let rotinas = JSON.parse(localStorage.getItem(chave) || '[]');
        rotinas.push(novaRotina);
        localStorage.setItem(chave, JSON.stringify(rotinas));
        
        // Mostra o toast primeiro
        this.toast.showSuccess('Rotina criada com Sucesso!');
        
        // Depois navega após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/telaInicial']);
        }, 2000);
      }
    } catch (error) {
      this.toast.showError('Erro ao criar rotina: ' + error);
    }
  }

  voltarParaInicio() {
    this.router.navigate(['/telaInicial']);
  }
}