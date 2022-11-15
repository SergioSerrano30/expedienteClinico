import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteHistoriasComponent } from './paciente-historias.component';

describe('PacienteHistoriasComponent', () => {
  let component: PacienteHistoriasComponent;
  let fixture: ComponentFixture<PacienteHistoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteHistoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteHistoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
