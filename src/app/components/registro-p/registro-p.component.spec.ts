import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPComponent } from './registro-p.component';

describe('RegistroPComponent', () => {
  let component: RegistroPComponent;
  let fixture: ComponentFixture<RegistroPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
