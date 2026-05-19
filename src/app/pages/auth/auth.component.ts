import {

  Component,
  OnInit

} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { Router }
from '@angular/router';

import { AuthService }
from '../../services/auth.service';

import { UserService }
from '../../services/user.service';

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

export class AuthComponent
implements OnInit {

  // =========================================
  // LOGIN MODE
  // =========================================

  isLoginMode = true;

  // =========================================
  // DESIGNATIONS
  // =========================================

  designations: string[] = [];

  showNewDesignationInput = false;

  newDesignation = '';

  // =========================================
  // LOGIN DATA
  // =========================================

  loginData = {

    email: '',

    password: ''

  };

  // =========================================
  // REGISTER DATA
  // =========================================

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

    private userService: UserService,

    private router: Router

  ) {}

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {

    this.loadDesignations();

  }

  // =========================================
  // LOAD DESIGNATIONS
  // =========================================

  loadDesignations(): void {

    this.userService

      .getDesignations()

      .subscribe({

        next: (res: any) => {

          this.designations = res;

        }

      });

  }

  // =========================================
  // DESIGNATION CHANGE
  // =========================================

  onDesignationChange(): void {

    if (

      this.registerData.designation ===
      'NEW_DESIGNATION'

    ) {

      this.showNewDesignationInput = true;

    }

    else {

      this.showNewDesignationInput = false;

    }

  }

  // =========================================
  // LOGIN
  // =========================================

  login(): void {

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
              res.accessToken
                .split('.')[1]
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

        }

      });

  }

  // =========================================
  // REGISTER
  // =========================================

  register(): void {

    // PASSWORD CHECK

    if (

      this.registerData.password !==
      this.registerData.confirmPassword

    ) {

      return;

    }

    // DESIGNATION CHECK

    if (

      !this.registerData.designation

    ) {

      return;

    }

    // =====================================
    // NEW DESIGNATION
    // =====================================

    if (

      this.registerData.designation ===
      'NEW_DESIGNATION'

    ) {

      this.registerData.designation =
        this.newDesignation
          .trim()
          .toUpperCase()
          .replace(/\s+/g, '_');

    }

    // =====================================
    // PAYLOAD
    // =====================================

    const payload = {

      name: this.registerData.name,

      email: this.registerData.email,

      password: this.registerData.password,

      role: this.registerData.role,

      designation:
        this.registerData.designation

    };

    // =====================================
    // API CALL
    // =====================================

    this.authService

      .register(payload)

      .subscribe({

        next: (res: any) => {

          console.log(res);

          // RESET FORM

          this.registerData = {

            name: '',

            email: '',

            password: '',

            confirmPassword: '',

            role: 'MEMBER',

            designation: ''

          };

          this.newDesignation = '';

          this.showNewDesignationInput = false;

          // RELOAD DESIGNATIONS

          this.loadDesignations();

          // SWITCH TO LOGIN

          this.isLoginMode = true;

        }

      });

  }

  // =========================================
  // TOGGLE LOGIN / REGISTER
  // =========================================

  toggleMode(): void {

    this.isLoginMode =
      !this.isLoginMode;

  }

}