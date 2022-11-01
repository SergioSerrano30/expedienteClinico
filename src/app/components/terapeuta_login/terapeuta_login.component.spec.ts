import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDComponent } from './terapeuta_login.component';

describe('LoginDComponent', () => {
  let component: LoginDComponent;
  let fixture: ComponentFixture<LoginDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
