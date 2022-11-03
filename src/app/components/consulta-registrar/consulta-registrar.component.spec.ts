import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRegistrarComponent } from './consulta-registrar.component';

describe('ConsultaRegistrarComponent', () => {
  let component: ConsultaRegistrarComponent;
  let fixture: ComponentFixture<ConsultaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
