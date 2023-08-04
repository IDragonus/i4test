import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  admin = {
    username: 'test',
    password: 'test',
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Definimos el FormControl para el username
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const data = {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
      };
      if (
        this.admin.username === data.username &&
        this.admin.password === data.password
      ) {
        this.grabarLocalStorage(data);
        this.router.navigate(['/home']);
      }
    }
  }

  // grabarLocalStorage(data: any) {
  //   localStorage.setItem('persona', JSON.stringify(data));
  //   console.log(
  //     'LOGIN:',
  //     localStorage.setItem('persona', JSON.stringify(data))
  //   );
  // }

  grabarLocalStorage(data: Admin) {
    try {
      localStorage.setItem('persona', JSON.stringify(data));
      const savedData = JSON.parse(localStorage.getItem('persona') || '{}');
      console.log('LOGIN:', savedData);
    } catch (error) {
      console.error('Error al guardar en el almacenamiento local:', error);
    }
  }
}
