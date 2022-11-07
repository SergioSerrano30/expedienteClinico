import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteConsultasComponent } from './paciente-consultas.component';

describe('PacienteConsultasComponent', () => {
  let component: PacienteConsultasComponent;
  let fixture: ComponentFixture<PacienteConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
