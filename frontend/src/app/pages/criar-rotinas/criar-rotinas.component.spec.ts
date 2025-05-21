import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarRotinasComponent } from './criar-rotinas.component';

describe('CriarRotinasComponent', () => {
  let component: CriarRotinasComponent;
  let fixture: ComponentFixture<CriarRotinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarRotinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarRotinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
