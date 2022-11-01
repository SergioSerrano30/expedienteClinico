import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPacienteTComponent } from './modificar-paciente-t.component';

describe('ModificarPacienteTComponent', () => {
  let component: ModificarPacienteTComponent;
  let fixture: ComponentFixture<ModificarPacienteTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPacienteTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPacienteTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
