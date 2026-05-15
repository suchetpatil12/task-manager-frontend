import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private apiUrl =
    `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

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

      `${this.apiUrl}/project/${projectId}?page=${page}&size=${size}`

    );

  }

  // ✅ GET TASK BY ID
  getTaskById(id: number) {

    return this.http.get(

      `${this.apiUrl}/${id}`

    );

  }

  // ✅ CREATE TASK
  createTask(data: any) {

    return this.http.post(

      this.apiUrl,

      data

    );

  }

  // ✅ UPDATE TASK
  updateTask(id: number, data: any) {

    return this.http.put(

      `${this.apiUrl}/${id}`,

      data

    );

  }

  // ✅ DELETE TASK
  deleteTask(id: number) {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      {

        responseType: 'text'

      }

    );

  }

  // ✅ GET STATUS ENUMS
  getStatuses() {

    return this.http.get<string[]>(

      `${this.apiUrl}/statuses`

    );

  }

}