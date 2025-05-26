import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { TelaInicialComponent } from './pages/tela-inicial/tela-inicial.component';
import { CriarRotinasComponent } from './pages/criar-rotinas/criar-rotinas.component';
import { TelaPomodoroComponent } from './pages/tela-pomodoro/tela-pomodoro.component';



export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'telaInicial', component: TelaInicialComponent },
  { path: 'criarRotinas', component: CriarRotinasComponent},
  { path: 'telaPomodoro', component: TelaPomodoroComponent},
  {
  path: 'editarRotina',
  loadComponent: () => import('./pages/editar-rotina/editar-rotina.component').then(m => m.EditarRotinaComponent)
  }
];