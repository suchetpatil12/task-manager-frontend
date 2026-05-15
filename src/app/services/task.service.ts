import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private api =
    'http://localhost:8080/tasks';

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

    `${this.api}/search/${projectId}`,

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

      `${this.api}/project/${projectId}?page=${page}&size=${size}`

    );

  }

  // ✅ GET TASK BY ID
  getTaskById(id: number) {

    return this.http.get(

      `${this.api}/${id}`

    );

  }

  // ✅ CREATE TASK
  createTask(data: any) {

    return this.http.post(

      this.api,

      data

    );

  }

  // ✅ UPDATE TASK
  updateTask(id: number, data: any) {

    return this.http.put(

      `${this.api}/${id}`,

      data

    );

  }

  // ✅ DELETE TASK
  deleteTask(id: number) {

    return this.http.delete(

      `${this.api}/${id}`,

      {

        responseType: 'text'

      }

    );

  }

  // ✅ GET STATUS ENUMS
getStatuses() {

  return this.http.get<string[]>(

    'http://localhost:8080/tasks/statuses'

  );

}

  }

