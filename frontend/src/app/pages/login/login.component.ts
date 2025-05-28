import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Adicione esta linha

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // Inclua CommonModule aqui
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuario = usuarios.find((u: any) => u.email === this.email && u.senha === this.senha);
      if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.erro = '';
        this.router.navigate(['/telaInicial']);
      } else {
        this.erro = 'E-mail ou senha inválidos!';
      }
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