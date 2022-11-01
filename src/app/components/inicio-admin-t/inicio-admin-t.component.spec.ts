import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAdminTComponent } from './inicio-admin-t.component';

describe('InicioAdminTComponent', () => {
  let component: InicioAdminTComponent;
  let fixture: ComponentFixture<InicioAdminTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioAdminTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioAdminTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
