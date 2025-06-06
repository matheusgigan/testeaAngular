import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  erro = '';
  sucesso = '';

  constructor(private router: Router) {}

  cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.erro = 'Preencha todos os campos!';
      return;
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      if (usuarios.find((u: any) => u.email === this.email)) {
        this.erro = 'E-mail já cadastrado!';
        return;
      }

      usuarios.push({ nome: this.nome, email: this.email, senha: this.senha });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      this.sucesso = 'Cadastro realizado com sucesso!';
      this.erro = '';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    }
 
  }

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