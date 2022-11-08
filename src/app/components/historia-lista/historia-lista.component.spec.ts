import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaListaComponent } from './historia-lista.component';

describe('HistoriaListaComponent', () => {
  let component: HistoriaListaComponent;
  let fixture: ComponentFixture<HistoriaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
