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

// ✅ REGISTER CHART COMPONENTS

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

export class DashboardComponent
implements OnInit {

  // =========================================
  // DASHBOARD DATA
  // =========================================

  dashboardData: any = {

    totalProjects: 0,

    totalTasks: 0,

    completedTasks: 0,

    pendingTasks: 0,

    inProgressTasks: 0

  };

  // =========================================
  // RECENT ACTIVITIES
  // =========================================

  recentActivities: any[] = [];

  // =========================================
  // PIE CHART LABELS
  // =========================================

  pieChartLabels = [

    'Completed',

    'Pending',

    'In Progress'

  ];

  // =========================================
  // PIE CHART TYPE
  // =========================================

  pieChartType: any = 'pie';

  // =========================================
  // PIE CHART DATA
  // =========================================

  pieChartData = {

    labels: this.pieChartLabels,

    datasets: [

      {

        data: [0, 0, 0],

        backgroundColor: [

          '#10b981',

          '#f59e0b',

          '#3b82f6'

        ],

        hoverBackgroundColor: [

          '#059669',

          '#d97706',

          '#2563eb'

        ],

        borderWidth: 0

      }

    ]

  };

  // =========================================
  // PIE CHART OPTIONS
  // =========================================

  pieChartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        position: 'bottom',

        labels: {

          usePointStyle: true,

          padding: 25,

          font: {

            size: 14,

            weight: '600'

          }

        }

      }

    }

  };

  constructor(

    private dashboardService: DashboardService

  ) {}

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {

    this.loadDashboard();

    this.loadRecentActivities();

  }

  // =========================================
  // LOAD DASHBOARD DATA
  // =========================================

  loadDashboard(): void {

    this.dashboardService

      .getDashboardData()

      .subscribe({

        next: (res: any) => {

          this.dashboardData = res;

          // ✅ UPDATE PIE CHART DATA

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

                hoverBackgroundColor: [

                  '#059669',

                  '#d97706',

                  '#2563eb'

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

  // =========================================
  // LOAD RECENT ACTIVITIES
  // =========================================

  loadRecentActivities(): void {

    this.dashboardService

      .getRecentActivities()

      .subscribe({

        next: (res: any) => {

          this.recentActivities = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}