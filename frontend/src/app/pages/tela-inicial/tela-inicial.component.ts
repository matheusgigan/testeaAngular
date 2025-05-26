import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css'
})
export class TelaInicialComponent {
  nomeUsuario: string = '';
  nivelUsuario: number = 1;
  dias: number = 12;
  rotinas: any[] = [];
  buscaRotina: string = '';
  filtroConcluido: string = '';
  darkModeAtivo = false;
  isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.carregarRotinas();
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.registrarAcessoDiario();
      const usuarioStr = localStorage.getItem('usuarioLogado');
      if (usuarioStr) {
        const usuario = JSON.parse(usuarioStr);
        this.nomeUsuario = usuario.nome || usuario.email || 'Usuário';
        this.nivelUsuario = this.getLevel(usuario.email);
      }
    }
  }

  getLevel(email: string): number {
    if (this.isBrowser) {
      const xp = Number(localStorage.getItem(`xp_${email}`)) || 0;
      return Math.floor(xp / 100) + 1;
    }
    return 1;
  }

  carregarRotinas() {
    if (this.isBrowser) {
      const usuarioStr = localStorage.getItem('usuarioLogado');
      if (!usuarioStr) {
        this.rotinas = [];
        return;
      }
      try {
        const usuario = JSON.parse(usuarioStr);
        const chave = `rotinas_${usuario.email}`;
        const rotinasSalvas = localStorage.getItem(chave);
        this.rotinas = rotinasSalvas ? JSON.parse(rotinasSalvas) : [];
      } catch (error) {
        console.error('Erro ao carregar rotinas', error);
        this.rotinas = [];
      }
    } else {
      this.rotinas = [];
    }
  }

  criarNovaRotina() {
    this.router.navigate(['/criarRotinas']);
  }

  editarRotina(rotina: any) {
    if (this.isBrowser) {
      localStorage.setItem('rotinaEditando', JSON.stringify(rotina));
      this.router.navigate(['/editarRotina']);
    }
  }

  comecarRotina(rotina: any) {
    if (this.isBrowser) {
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
      if (usuario) {
        localStorage.setItem('rotinaSelecionada', JSON.stringify({ ...rotina, usuarioEmail: usuario.email }));
        this.router.navigate(['/telaPomodoro']);
      }
    }
  }

  onSubmit() {
    // lógica de login (pode deixar vazio por enquanto)
    console.log('Formulário enviado!');
  }

  alternarDarkMode() {
    this.darkModeAtivo = !this.darkModeAtivo;
    if (this.darkModeAtivo) {
      document.body.classList.add('dark-mode-paper');
    } else {
      document.body.classList.remove('dark-mode-paper');
    }
  }

  get rotinasFiltradas() {
    return this.rotinas.filter(rotina => {
      const nomeOk = this.buscaRotina
        ? rotina.nome.toLowerCase().includes(this.buscaRotina.toLowerCase())
        : true;
      const filtroOk =
        this.filtroConcluido === 'concluido'
          ? rotina.status === 'concluido'
          : this.filtroConcluido === 'nao-concluido'
          ? rotina.status !== 'concluido'
          : true;
      return nomeOk && filtroOk;
    });
  }

  registrarAcessoDiario() {
    if (this.isBrowser) {
      const hoje = new Date().toDateString();
      const ultimoAcesso = localStorage.getItem('ultimoAcesso');
      let sequencia = Number(localStorage.getItem('sequenciaFoguinho')) || 0;

      if (ultimoAcesso !== hoje) {
        // Se o último acesso foi ontem, incrementa a sequência
        const ontem = new Date();
        ontem.setDate(ontem.getDate() - 1);
        if (ultimoAcesso === ontem.toDateString()) {
          sequencia++;
        } else {
          // Se não foi ontem, reinicia a sequência
          sequencia = 1;
        }
        localStorage.setItem('sequenciaFoguinho', sequencia.toString());
        localStorage.setItem('ultimoAcesso', hoje);
      }
      this.dias = sequencia;
    }
  }

  excluirRotina(rotina: any) {
    if (this.isBrowser) {
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
      if (usuario) {
        const chave = `rotinas_${usuario.email}`;
        this.rotinas = this.rotinas.filter(r => r.nome !== rotina.nome);
        localStorage.setItem(chave, JSON.stringify(this.rotinas));
        this.carregarRotinas();
      }
    }
  }
}