import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl =
    'http://localhost:8080/auth';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // LOGIN
  // =========================

  login(data: any) {

    return this.http.post<any>(

      `${this.apiUrl}/login`,

      data

    );

  }

  // =========================
  // REGISTER
  // =========================

  register(payload: {

    name: string;

    email: string;

    password: string;

    role: string;

  }) {

    return this.http.post(

      `${this.apiUrl}/register`,

      payload

    );

  }

  // =========================
  // SAVE TOKEN
  // =========================

  saveToken(token: string) {

    // SAVE JWT

    localStorage.setItem(
      'token',
      token
    );

    // DECODE JWT

    const decoded: any =
      jwtDecode(token);

    // SAVE ROLE

    localStorage.setItem(
      'role',
      decoded.role
    );

    console.log(decoded);

  }

  // =========================
  // GET TOKEN
  // =========================

  getToken() {

    return localStorage.getItem(
      'token'
    );

  }

  // =========================
  // GET ROLE
  // =========================

  getRole() {

    return localStorage.getItem(
      'role'
    );

  }

  // =========================
  // CHECK ADMIN
  // =========================

  isAdmin(): boolean {

    const role =
      localStorage.getItem('role');

    return role === 'ADMIN';

  }

  // =========================
  // CHECK LOGIN
  // =========================

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );

  }

  // =========================
  // LOGOUT
  // =========================

  logout() {

    localStorage.clear();

  }

}