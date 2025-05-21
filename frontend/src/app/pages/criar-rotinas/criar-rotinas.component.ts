import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-criar-rotinas',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './criar-rotinas.component.html',
  styleUrl: './criar-rotinas.component.css'
})
export class CriarRotinasComponent {
  nomeRotina = '';
  metaRotina = '';
  tempoRotina = '';
  onSubmit() {
    // lógica de login (pode deixar vazio por enquanto)
    console.log('Formulário enviado!');
  }
}


