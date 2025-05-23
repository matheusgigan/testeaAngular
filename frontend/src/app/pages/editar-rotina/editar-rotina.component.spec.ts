import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRotinaComponent } from './editar-rotina.component';

describe('EditarRotinaComponent', () => {
  let component: EditarRotinaComponent;
  let fixture: ComponentFixture<EditarRotinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRotinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRotinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
