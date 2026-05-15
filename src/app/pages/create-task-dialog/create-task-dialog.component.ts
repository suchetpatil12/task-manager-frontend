import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { TaskService } from '../../services/task.service';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-task-dialog',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './create-task-dialog.component.html',

  styleUrls: ['./create-task-dialog.component.css']
})

export class CreateTaskDialogComponent
implements OnInit {

  // =========================================
  // STATUS LIST
  // =========================================

  statuses: string[] = [];

  // =========================================
  // PRIORITIES
  // =========================================

  priorities: string[] = [
    'LOW',
    'MEDIUM',
    'HIGH'
  ];

  // =========================================
  // USERS
  // =========================================

  filteredUsers: any[] = [];

  // =========================================
  // DESIGNATIONS
  // =========================================

  designations: string[] = [];

  selectedDesignation = '';

  // =========================================
  // TASK OBJECT
  // =========================================

  task: any = {

    title: '',

    description: '',

    dueDate: '',

    status: 'TODO',

    priority: 'MEDIUM',

    assignedUserId: null,

    projectId: 0

  };

  constructor(

    private dialogRef:
      MatDialogRef<CreateTaskDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private taskService: TaskService,

    private userService: UserService

  ) {}

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {

    this.task.projectId =
      this.data.projectId;

    this.loadStatuses();

    this.loadDesignations();

  }

  // =========================================
  // LOAD STATUS
  // =========================================

  loadStatuses(): void {

    this.taskService

      .getStatuses()

      .subscribe({

        next: (res: any) => {

          this.statuses = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =========================================
  // LOAD DESIGNATIONS
  // =========================================

  loadDesignations(): void {

    this.userService

      .getDesignations()

      .subscribe({

        next: (res: any) => {

          this.designations = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =========================================
  // FILTER USERS
  // =========================================

  filterUsersByDesignation(): void {

    this.task.assignedUserId = null;

    if (!this.selectedDesignation) {

      this.filteredUsers = [];

      return;

    }

    this.userService

      .getUsersByDesignation(
        this.selectedDesignation
      )

      .subscribe({

        next: (res: any) => {

          console.log('FILTERED USERS:', res);

          this.filteredUsers = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =========================================
  // CREATE TASK
  // =========================================

  createTask(): void {

    const payload = {

      title: this.task.title,

      description: this.task.description,

      dueDate: this.task.dueDate,

      status: this.task.status,

      priority: this.task.priority,

      assignedUserId:
        Number(this.task.assignedUserId),

      projectId:
        Number(this.task.projectId)

    };

    console.log('CREATE PAYLOAD:', payload);

    this.taskService

      .createTask(payload)

      .subscribe({

        next: () => {

          alert('Task Created Successfully');

          this.dialogRef.close(true);

        },

        error: (err) => {

          console.log(err);

          alert('Failed to create task');

        }

      });

  }

  // =========================================
  // CLOSE MODAL
  // =========================================

  closeModal(): void {

    this.dialogRef.close();

  }

}