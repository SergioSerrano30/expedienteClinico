import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapeutaConsultasComponent } from './terapeuta-consultas.component';

describe('TerapeutaConsultasComponent', () => {
  let component: TerapeutaConsultasComponent;
  let fixture: ComponentFixture<TerapeutaConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerapeutaConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerapeutaConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
