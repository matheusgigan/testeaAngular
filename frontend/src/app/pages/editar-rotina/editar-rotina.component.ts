import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Corrija este import!

@Component({
  selector: 'app-editar-rotina',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // Inclua CommonModule aqui
  templateUrl: './editar-rotina.component.html',
  styleUrl: './editar-rotina.component.css'
})
export class EditarRotinaComponent implements OnInit {
  rotina: any = { nome: '', meta: 1, tempo: 1, tipo: '' };

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const rotinaEditando = JSON.parse(localStorage.getItem('rotinaEditando') || 'null');
      if (rotinaEditando) {
        this.rotina = { ...rotinaEditando };
      }
    }
  }

  salvar() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
  if (usuario) {
    const chave = `rotinas_${usuario.email}`;
    let rotinas = JSON.parse(localStorage.getItem(chave) || '[]');
    const index = rotinas.findIndex((r: any) => r.nome === this.rotina.nome);
    if (index !== -1) {
      rotinas[index] = this.rotina;
      localStorage.setItem(chave, JSON.stringify(rotinas));
    }
    this.router.navigate(['/telaInicial']);
  }
}
  cancelar() {
    this.router.navigate(['/telaInicial']);
  }
}