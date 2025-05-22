import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasRotinasComponent } from './minhas-rotinas.component';

describe('MinhasRotinasComponent', () => {
  let component: MinhasRotinasComponent;
  let fixture: ComponentFixture<MinhasRotinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasRotinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasRotinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
