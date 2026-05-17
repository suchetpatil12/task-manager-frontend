import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment }
from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl =
    `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient
  ) {}

  // ✅ GET ALL USERS
  getUsers() {

    return this.http.get(

      this.apiUrl

    );

  }

  // ✅ GET DESIGNATIONS
  getDesignations() {

    return this.http.get<string[]>(

      `${this.apiUrl}/designations`

    );

  }

  // ✅ GET USERS BY DESIGNATION
  getUsersByDesignation(
    designation: string
  ) {

    return this.http.get(

      `${this.apiUrl}/by-designation/${designation}`

    );

  }

}