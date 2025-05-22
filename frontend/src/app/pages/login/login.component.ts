import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
 email = '';
  password = '';
  erro = '';

  onSubmit() {
    // Simulação de usuário e senha
    const usuarioDemo = 'usuario@teste.com';
    const senhaDemo = '123456';

    if (this.email === usuarioDemo && this.password === senhaDemo) {
      this.erro = '';
      // Redireciona para a tela inicial
      window.location.href = '/telaInicial';
    } else {
      this.erro = 'E-mail ou senha inválidos!';
    }
  }
}