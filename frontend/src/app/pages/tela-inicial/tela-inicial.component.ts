import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css'
})
export class TelaInicialComponent {
  //Usuário de teste - UI
  nomeUsuario: string = '';
  nivelUsuario: number = 1;
  // dailyProgress: number = 96;
  dias: number = 12;
  //Imagem de teste
  imagemCoruja = 'https://img.lovepik.com/element/45006/3503.png_860.png'; 
  rotinas: any[] = [];

  constructor(
    private router: Router,
){
    this.carregarRotinas();
  }

  
ngOnInit() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const usuarioStr = localStorage.getItem('usuarioLogado');
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      this.nomeUsuario = usuario.nome || usuario.email || 'Usuário';
      this.nivelUsuario = this.getLevel(usuario.email); 
    }
  }
}
getLevel(email: string): number {
  const xp = Number(localStorage.getItem(`xp_${email}`)) || 0;
  return Math.floor(xp / 100) + 1;
}

  carregarRotinas(){
    const usuarioStr = localStorage.getItem('usuarioLogado');
    if(!usuarioStr) {
      this.rotinas = [];
      return;
    }

    try{
      const usuario = JSON.parse(usuarioStr);
      const chave = `rotinas_${usuario.email}`
      const rotinasSalvas = localStorage.getItem(chave);
      this.rotinas = rotinasSalvas ? JSON.parse(rotinasSalvas) : [];
    } catch (error) {
      console.error('Erro ao carregar rotinas', error);
      this.rotinas = [];
    }
  }

  criarNovaRotina() {
    this.router.navigate(['/criarRotinas']);
  }

  editarRotina(rotina: any) {
    localStorage.setItem('rotinaEditando', JSON.stringify(rotina));
    this.router.navigate(['/editarRotina']);
  }

  comecarRotina(rotina: any) {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
    if (usuario) {
      localStorage.setItem('rotinaSelecionada', JSON.stringify({ ...rotina, usuarioEmail: usuario.email }));
      this.router.navigate(['/telaPomodoro']);
    }
  }

  onSubmit() {
    // lógica de login (pode deixar vazio por enquanto)
    console.log('Formulário enviado!');
  }
}

