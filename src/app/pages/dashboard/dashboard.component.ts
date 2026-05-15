import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { DashboardService } from '../../services/dashboard.service';

import {
  BaseChartDirective
} from 'ng2-charts';

import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// ✅ REGISTER CHART
Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData: any = {};

  // ✅ PIE CHART LABELS
  pieChartLabels = [
    'Completed',
    'Pending',
    'In Progress'
  ];

  // ✅ PIE CHART DATA
  pieChartData = {
    labels: this.pieChartLabels,
    datasets: [
  {
    data: [0, 0, 0],

    backgroundColor: [

      '#10b981', // completed

      '#f59e0b', // pending

      '#3b82f6'  // progress

    ],

    borderWidth: 0
  }
]
  };

  pieChartType: any = 'pie';

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard() {

    this.dashboardService
      .getDashboardData()

      .subscribe({

        next: (res: any) => {

          this.dashboardData = res;

          // ✅ UPDATE CHART
          this.pieChartData = {

            labels: this.pieChartLabels,

            datasets: [

  {

    data: [

      res.completedTasks,

      res.pendingTasks,

      res.inProgressTasks

    ],

    backgroundColor: [

      '#10b981',

      '#f59e0b',

      '#3b82f6'

    ],

    borderWidth: 0

  }

]

          };

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}