import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-minhas-rotinas',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './minhas-rotinas.component.html',
  styleUrl: './minhas-rotinas.component.css'
})
export class MinhasRotinasComponent implements OnInit {
  rotinas: any[] = [];
  busca: string = '';
  filtroStatus: string = '';

  ngOnInit() {
    this.rotinas = JSON.parse(localStorage.getItem('rotinas') || '[]');
  }

  get rotinasFiltradas() {
    return this.rotinas.filter(r => {
      const nomeMatch = this.busca
        ? r.nome.toLowerCase().includes(this.busca.toLowerCase())
        : true;
      const statusMatch = this.filtroStatus
        ? (r.status || 'em-andamento') === this.filtroStatus
        : true;
      return nomeMatch && statusMatch;
    });
  }
}