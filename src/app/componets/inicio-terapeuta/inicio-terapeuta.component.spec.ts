import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioTerapeutaComponent } from './inicio-terapeuta.component';

describe('InicioTerapeutaComponent', () => {
  let component: InicioTerapeutaComponent;
  let fixture: ComponentFixture<InicioTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioTerapeutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
