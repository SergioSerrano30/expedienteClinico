import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTerapeutaComponent } from './modificar-terapeuta.component';

describe('ModificarTerapeutaComponent', () => {
  let component: ModificarTerapeutaComponent;
  let fixture: ComponentFixture<ModificarTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTerapeutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
