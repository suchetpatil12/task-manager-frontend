import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {

    email: '',

    password: ''

  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.authService
      .login(this.loginData)

      .subscribe({

        next: (res) => {

          // ✅ CLEAR OLD LOGIN
          localStorage.clear();

          // ✅ SAVE TOKEN + ROLE
          this.authService.saveToken(
            res.accessToken
          );

          // ✅ REDIRECT
          this.router.navigate(['/dashboard']);

        },

        error: () => {

          alert('Invalid Credentials');

        }

      });

  }

}