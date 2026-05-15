import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private apiUrl =
    'http://localhost:8080/users';

  constructor(
    private http: HttpClient,
    
  ) {}

  getUsers() {

    return this.http.get(this.apiUrl);

  }

getDesignations() {

  return this.http.get<string[]>(

    'http://localhost:8080/users/designations'

  );

}

getUsersByDesignation(designation: string) {

  return this.http.get(

    `http://localhost:8080/users/by-designation/${designation}`

  );

}

}