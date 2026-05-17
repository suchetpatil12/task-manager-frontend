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

export class TaskService {

  private apiUrl =
    `${environment.apiUrl}/tasks`;

  constructor(
    private http: HttpClient
  ) {}

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

  // ✅ SEARCH TASKS
  searchTasks(
    projectId: number,
    keyword: string,
    status: string,
    page: number,
    size: number
  ) {

    return this.http.get(

      `${this.apiUrl}/search/${projectId}`,

      {

        headers: this.getHeaders().headers,

        params: {

          keyword: keyword || '',
          status: status || '',
          page,
          size

        }

      }

    );

  }

  // ✅ GET TASKS
  getTasks(
    projectId: number,
    page: number,
    size: number
  ) {

    return this.http.get(

      `${this.apiUrl}/project/${projectId}?page=${page}&size=${size}`,

      this.getHeaders()

    );

  }

  // ✅ GET TASK BY ID
  getTaskById(id: number) {

    return this.http.get(

      `${this.apiUrl}/${id}`,

      this.getHeaders()

    );

  }

  // ✅ CREATE TASK
  createTask(data: any) {

    return this.http.post(

      this.apiUrl,

      data,

      this.getHeaders()

    );

  }

  // ✅ UPDATE TASK
  updateTask(id: number, data: any) {

    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.getHeaders()

    );

  }

  // ✅ DELETE TASK
  deleteTask(id: number) {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      {

        headers: this.getHeaders().headers,

        responseType: 'text'

      }

    );

  }

  // ✅ GET STATUS ENUMS
  getStatuses() {

    return this.http.get<string[]>((

      `${this.apiUrl}/statuses`

    ),

    this.getHeaders()

    );

  }

}