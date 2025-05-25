import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-rotinas',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './criar-rotinas.component.html',
  styleUrl: './criar-rotinas.component.css'
})
export class CriarRotinasComponent {
  nomeRotina = '';
  metaRotina = 1;
  tempoRotina = 1;
  tipoRotina = '';

  constructor(private router: Router) {}

  onSubmit() {
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
      this.router.navigate(['/telaInicial']);
    }
  }

  voltarParaInicio() {
    this.router.navigate(['/telaInicial']);
  }
}