import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { environment }
from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  // =========================================
  // BASE API
  // =========================================

  private api =
    `${environment.apiUrl}/projects`;

  constructor(
    private http: HttpClient
  ) {}

  // =========================================
  // JWT HEADERS
  // =========================================

  private getHeaders() {

    const token =
      localStorage.getItem('token');

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${token}`

      })

    };

  }

  // =========================================
  // GET PROJECTS WITH SEARCH + PAGINATION
  // =========================================

  getProjects(

    page: number,

    size: number,

    keyword: string = ''

  ) {

    return this.http.get<any>(

      `${this.api}/search`,

      {

        ...this.getHeaders(),

        params: {

          keyword,

          page,

          size

        }

      }

    );

  }

  // =========================================
  // CREATE PROJECT
  // =========================================

  createProject(data: any) {

    return this.http.post(

      this.api,

      data,

      this.getHeaders()

    );

  }

  // =========================================
  // UPDATE PROJECT
  // =========================================

  updateProject(
    id: number,
    payload: any
  ) {

    return this.http.put(

      `${this.api}/${id}`,

      payload,

      this.getHeaders()

    );

  }

  // =========================================
  // DELETE PROJECT
  // =========================================

  deleteProject(
    projectId: number
  ) {

    return this.http.delete(

      `${this.api}/${projectId}`,

      {

        ...this.getHeaders(),

        responseType: 'text'

      }

    );

  }

  // =========================================
  // GET PROJECT MEMBERS
  // =========================================

  getProjectMembers(
    projectId: number
  ) {

    return this.http.get(

      `${this.api}/${projectId}/members`,

      this.getHeaders()

    );

  }

  // =========================================
  // ADD PROJECT MEMBER
  // =========================================

  addProjectMember(

    projectId: number,

    userId: number

  ) {

    return this.http.post(

      `${this.api}/${projectId}/members/${userId}`,

      {},

      this.getHeaders()

    );

  }

  // =========================================
  // REMOVE PROJECT MEMBER
  // =========================================

  removeProjectMember(

    projectId: number,

    userId: number

  ) {

    return this.http.delete(

      `${this.api}/${projectId}/members/${userId}`,

      this.getHeaders()

    );

  }

  // =========================================
  // GET MEMBERS BY DESIGNATION
  // =========================================

  getMembersByDesignation(

    projectId: number,

    designation: string

  ) {

    return this.http.get(

      `${this.api}/${projectId}/members/by-designation?designation=${designation}`,

      this.getHeaders()

    );

  }

}