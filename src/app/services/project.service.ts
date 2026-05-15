import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private api =
    'http://localhost:8080/projects';

  constructor(private http: HttpClient) {}

  // ✅ JWT HEADERS
  private getHeaders() {

    const token =
      localStorage.getItem('token');

    return {

      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`

      })

    };

  }

  // ✅ GET PROJECTS
  getProjects() {

    return this.http.get(

      this.api,

      this.getHeaders()

    );

  }

  // ✅ CREATE PROJECT
  createProject(data: any) {

    return this.http.post(

      this.api,

      data,

      this.getHeaders()

    );

  }

}