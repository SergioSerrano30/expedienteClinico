import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapeutaComponent } from './terapeuta.component';

describe('TerapeutaComponent', () => {
  let component: TerapeutaComponent;
  let fixture: ComponentFixture<TerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerapeutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
