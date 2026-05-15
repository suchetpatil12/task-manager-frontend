import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';

import { MatDialog } from '@angular/material/dialog';

import { TaskService } from '../../services/task.service';

import { AuthService } from '../../services/auth.service';

import { LoadingService } from '../../services/loading.service';

import { CreateTaskDialogComponent }
from '../create-task-dialog/create-task-dialog.component';

import { EditTaskComponent }
from '../edit-task/edit-task.component';

@Component({
  selector: 'app-tasks',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],

  templateUrl: './tasks.component.html',

  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  // =========================================
  // TASK DATA
  // =========================================

  tasks: any[] = [];

  statuses: string[] = [];

  // =========================================
  // PAGINATION
  // =========================================

  page = 0;

  size = 5;

  totalPages = 0;

// =========================================
// PROJECT
// =========================================

projectId!: number;

projectName = '';

  // =========================================
  // FILTERS
  // =========================================

  searchKeyword = '';

  selectedStatus = '';

  // =========================================
  // TABLE COLUMNS
  // =========================================

  displayedColumns: string[] = [

    'title',

    'status',

    'priority',

    'assignedTo',

    'projectName',

    'actions'

  ];

  constructor(

    private taskService: TaskService,

    private route: ActivatedRoute,

    public authService: AuthService,

    private snackBar: MatSnackBar,

    private loadingService: LoadingService,

    private dialog: MatDialog

  ) {}

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {

    this.projectId = Number(
      this.route.snapshot.paramMap.get('projectId')
    );

    this.loadStatuses();

    this.loadTasks();

  }

  // =========================================
  // LOAD STATUS ENUMS
  // =========================================

  loadStatuses(): void {

    this.taskService

      .getStatuses()

      .subscribe({

        next: (res) => {

          this.statuses = res;

        }

      });

  }

  // =========================================
  // PRIORITY SORTING
  // =========================================

  sortTasksByPriority(tasks: any[]): any[] {

    const priorityOrder: any = {

      HIGH: 1,

      MEDIUM: 2,

      LOW: 3

    };

    return tasks.sort((a: any, b: any) => {

      return priorityOrder[a.priority]
           - priorityOrder[b.priority];

    });

  }

  // =========================================
  // OPEN CREATE TASK MODAL
  // =========================================

  openCreateTaskModal(): void {

    const dialogRef = this.dialog.open(

      CreateTaskDialogComponent,

      {

        width: '760px',

        maxWidth: '95vw',

        maxHeight: '95vh',

        disableClose: true,

        panelClass: 'custom-dialog-container',

        data: {

          projectId: this.projectId

        }

      }

    );

    dialogRef.afterClosed()

      .subscribe((result: any) => {

        if (result) {

          this.loadTasks();

        }

      });

  }

  // =========================================
  // LOAD TASKS
  // =========================================

  loadTasks(): void {

    this.loadingService.show();

    this.taskService

      .getTasks(
        this.projectId,
        this.page,
        this.size
      )

      .subscribe({

        next: (res: any) => {

  this.tasks =
    this.sortTasksByPriority(res.content);

  this.totalPages = res.totalPages;

  // ✅ SET PROJECT NAME
  if (this.tasks.length > 0) {

    this.projectName =
      this.tasks[0].projectName;

  }

  this.loadingService.hide();

},

        error: () => {

          this.loadingService.hide();

        }

      });

  }

  // =========================================
  // SEARCH TASKS
  // =========================================

  searchTasks(): void {

    this.taskService

      .searchTasks(

        this.projectId,

        this.searchKeyword,

        this.selectedStatus,

        this.page,

        this.size

      )

      .subscribe({

        next: (res: any) => {

  this.tasks =
    this.sortTasksByPriority(res.content);

  this.totalPages = res.totalPages;

  // ✅ KEEP PROJECT NAME
  if (this.tasks.length > 0) {

    this.projectName =
      this.tasks[0].projectName;

  }

}

      });

  }

  // =========================================
  // NEXT PAGE
  // =========================================

  nextPage(): void {

    if (this.page < this.totalPages - 1) {

      this.page++;

      this.searchTasks();

    }

  }

  // =========================================
  // PREVIOUS PAGE
  // =========================================

  prevPage(): void {

    if (this.page > 0) {

      this.page--;

      this.searchTasks();

    }

  }

  // =========================================
  // EDIT TASK
  // =========================================

  editTask(task: any): void {

    const dialogRef = this.dialog.open(

      EditTaskComponent,

      {

        width: '900px',

        maxWidth: '95vw',

        maxHeight: '95vh',

        panelClass: 'custom-dialog-container',

        disableClose: true,

        data: {

          taskId: task.id

        }

      }

    );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadTasks();

        }

      });

  }

  // =========================================
  // DELETE TASK
  // =========================================

  deleteTask(taskId: number): void {

    const confirmDelete =
      confirm('Delete this task?');

    if (!confirmDelete) {

      return;

    }

    this.taskService

      .deleteTask(taskId)

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Task Deleted Successfully',

            '✕',

            {

              duration: 3000,

              horizontalPosition: 'right',

              verticalPosition: 'top',

              panelClass: ['success-snackbar']

            }

          );

          this.loadTasks();

        },

        error: () => {

          this.snackBar.open(

            'Delete Failed',

            '✕',

            {

              duration: 3000,

              horizontalPosition: 'right',

              verticalPosition: 'top',

              panelClass: ['error-snackbar']

            }

          );

        }

      });

  }

  // =========================================
  // UPDATE STATUS
  // =========================================

  updateStatus(task: any): void {

    const updatedTask = {

      title: task.title,

      description: task.description,

      dueDate: task.dueDate,

      status: task.status,

      priority: task.priority,

      assignedUserId: task.assignedUserId,

      projectId: this.projectId

    };

    this.taskService

      .updateTask(
        task.id,
        updatedTask
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Status Updated Successfully',

            '✕',

            {

              duration: 3000,

              horizontalPosition: 'right',

              verticalPosition: 'top',

              panelClass: ['success-snackbar']

            }

          );

          this.loadTasks();

        },

        error: () => {

          this.snackBar.open(

            'Update Failed',

            '✕',

            {

              duration: 3000,

              horizontalPosition: 'right',

              verticalPosition: 'top',

              panelClass: ['error-snackbar']

            }

          );

        }

      });

  }

}