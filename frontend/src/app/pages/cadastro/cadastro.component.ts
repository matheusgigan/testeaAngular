import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {


   onSubmit() {
    // lógica de login (pode deixar vazio por enquanto)
    console.log('Formulário enviado!');
  }
}
