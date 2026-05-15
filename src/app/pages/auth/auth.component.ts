import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './auth.component.html',

  styleUrls: ['./auth.component.css']
})

export class AuthComponent {

  isLoginMode = true;

  // =========================
  // LOGIN DATA
  // =========================

  loginData = {

    email: '',

    password: ''

  };

  // =========================
  // REGISTER DATA
  // =========================

  registerData = {

    name: '',

    email: '',

    password: '',

    confirmPassword: '',

    role: 'MEMBER',

    designation: ''

  };

  constructor(

    private authService: AuthService,

    private router: Router

  ) {}

  // =========================
  // LOGIN
  // =========================

  login() {

    this.authService
      .login(this.loginData)

      .subscribe({

        next: (res: any) => {

          // SAVE TOKEN

          localStorage.setItem(
            'token',
            res.accessToken
          );

          // DECODE ROLE

          const payload = JSON.parse(
            atob(
              res.accessToken.split('.')[1]
            )
          );

          localStorage.setItem(
            'role',
            payload.role
          );

          // NAVIGATE

          this.router.navigate([
            '/dashboard'
          ]);

        },

        error: () => {

          alert('Invalid Credentials');

        }

      });

  }

  // =========================
  // REGISTER
  // =========================

  register() {

    // PASSWORD MATCH CHECK

    if (

      this.registerData.password !==
      this.registerData.confirmPassword

    ) {

      alert('Passwords do not match');

      return;

    }

    // DESIGNATION CHECK

    if (!this.registerData.designation) {

      alert('Please select designation');

      return;

    }

    // PAYLOAD

    const payload = {

      name: this.registerData.name,

      email: this.registerData.email,

      password: this.registerData.password,

      role: this.registerData.role,

      designation: this.registerData.designation

    };

    // API CALL

    this.authService
      .register(payload)

      .subscribe({

        next: (res: any) => {

          console.log(res);

          alert('Registration Successful');

          // RESET FORM

          this.registerData = {

            name: '',

            email: '',

            password: '',

            confirmPassword: '',

            role: 'MEMBER',

            designation: ''

          };

          // SWITCH TO LOGIN

          this.isLoginMode = true;

        },

        error: (err) => {

          console.log(err);

          alert('Registration Failed');

        }

      });

  }

  // =========================
  // TOGGLE LOGIN / REGISTER
  // =========================

  toggleMode() {

    this.isLoginMode =
      !this.isLoginMode;

  }

}