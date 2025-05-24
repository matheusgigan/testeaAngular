import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minhas-rotinas',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './minhas-rotinas.component.html',
  styleUrl: './minhas-rotinas.component.css'
})
export class MinhasRotinasComponent implements OnInit, OnDestroy {
  rotinas: any[] = [];
  busca: string = '';
  filtroStatus: string = '';
  private navSub: Subscription | undefined;

  constructor(private router: Router) {
    // Sempre que a navegação terminar, recarrega as rotinas
    this.navSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.carregarRotinas();
      }
    });
  }

  ngOnInit() {
    this.carregarRotinas();
  }

  ngOnDestroy() {
    if (this.navSub) {
      this.navSub.unsubscribe();
    }
  }

  carregarRotinas() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
      if (usuario) {
        const chave = `rotinas_${usuario.email}`;
        this.rotinas = JSON.parse(localStorage.getItem(chave) || '[]');
        let alterou = false;
        this.rotinas.forEach(r => {
          if ((r.diasConcluidos || 0) >= r.meta) {
            if (r.status !== 'concluido') {
              r.status = 'concluido';
              alterou = true;
            }
          }
        });
        if (alterou) {
          localStorage.setItem(chave, JSON.stringify(this.rotinas));
        }
      } else {
        this.rotinas = [];
      }
    } else {
      this.rotinas = [];
    }
  }

  excluirRotina(rotina: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
      if (usuario) {
        const chave = `rotinas_${usuario.email}`;
        this.rotinas = this.rotinas.filter(r => r.nome !== rotina.nome);
        localStorage.setItem(chave, JSON.stringify(this.rotinas));
        this.carregarRotinas();
      }
    }
  }

  editarRotina(rotina: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('rotinaEditando', JSON.stringify(rotina));
    }
    this.router.navigate(['/editarRotina']);
  }

  comecarRotina(rotina: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
      if (usuario) {
        localStorage.setItem('rotinaSelecionada', JSON.stringify({ ...rotina, usuarioEmail: usuario.email }));
        this.router.navigate(['/telaPomodoro']);
      }
    }
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