import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPomodoroComponent } from './tela-pomodoro.component';

describe('TelaPomodoroComponent', () => {
  let component: TelaPomodoroComponent;
  let fixture: ComponentFixture<TelaPomodoroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaPomodoroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaPomodoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
