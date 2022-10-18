import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDComponent } from './registro-d.component';

describe('RegistroDComponent', () => {
  let component: RegistroDComponent;
  let fixture: ComponentFixture<RegistroDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
