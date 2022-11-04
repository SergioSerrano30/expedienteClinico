import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOperacionesComponent } from './admin_operaciones.component';

describe('AdminOperacionesComponent', () => {
  let component: AdminOperacionesComponent;
  let fixture: ComponentFixture<AdminOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOperacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
