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
      tipo: this.tipoRotina
    };

    // Recupera rotinas existentes ou cria array vazio
    const rotinas = JSON.parse(localStorage.getItem('rotinas') || '[]');
    rotinas.push(novaRotina);
    localStorage.setItem('rotinas', JSON.stringify(rotinas));

    // Redireciona para Minhas Rotinas
    this.router.navigate(['/minhasRotinas']);
  }
}