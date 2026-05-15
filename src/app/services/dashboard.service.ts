import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api =
    'http://localhost:8080/dashboard';

  constructor(
    private http: HttpClient
  ) {}

  getDashboardData() {

    return this.http.get(this.api);

  }

}