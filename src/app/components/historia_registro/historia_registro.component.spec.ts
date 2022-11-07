import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaHistoriaComponent } from './historia_registro.component';

describe('NuevaHistoriaComponent', () => {
  let component: NuevaHistoriaComponent;
  let fixture: ComponentFixture<NuevaHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaHistoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
