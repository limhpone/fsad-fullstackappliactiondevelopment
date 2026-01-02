import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   it('form should be invalid when empty', () => {
  //   expect(component.loginForm.valid).toBeFalse();
  // });

  // it('form should be valid when email and password are filled', () => {
  //   component.loginForm.setValue({ email: 'test@example.com', password: '123456' });
  //   expect(component.loginForm.valid).toBeTrue();
  // });

  // it('should show error message when submitting invalid form', () => {
  //   component.onSubmit();
  //   expect(component.errorMessage).toBe('Please fill all required fields');
  // });

  // it('should call onSubmit when form is submitted', () => {
  //   spyOn(component, 'onSubmit');
  //   const form = fixture.debugElement.query(By.css('form'));
  //   form.triggerEventHandler('ngSubmit');
  //   expect(component.onSubmit).toHaveBeenCalled();
  // });
});
