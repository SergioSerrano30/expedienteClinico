import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TInicioComponent } from './t-inicio.component';

describe('TInicioComponent', () => {
  let component: TInicioComponent;
  let fixture: ComponentFixture<TInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
