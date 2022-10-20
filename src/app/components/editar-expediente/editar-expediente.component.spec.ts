import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExpedienteComponent } from './editar-expediente.component';

describe('EditarExpedienteComponent', () => {
  let component: EditarExpedienteComponent;
  let fixture: ComponentFixture<EditarExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
