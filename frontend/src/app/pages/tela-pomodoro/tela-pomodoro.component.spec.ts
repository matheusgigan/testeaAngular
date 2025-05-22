import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaPomodoroComponent } from './tela-pomodoro.component';
import { RouterModule } from '@angular/router';

describe('TelaPomodoroComponent', () => {
  let component: TelaPomodoroComponent;
  let fixture: ComponentFixture<TelaPomodoroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaPomodoroComponent, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TelaPomodoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});