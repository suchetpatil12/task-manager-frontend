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

import { ProjectService } from '../../services/project.service';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-task',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './edit-task.component.html',

  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent
implements OnInit {

  taskId!: number;

  projects: any[] = [];

  filteredUsers: any[] = [];

  designations: string[] = [];

  statuses: string[] = [];

  priorities: string[] = [
    'LOW',
    'MEDIUM',
    'HIGH'
  ];

  selectedDesignation = '';

  task: any = {

    title: '',

    description: '',

    dueDate: '',

    status: 'TODO',

    priority: 'MEDIUM',

    projectId: null,

    assignedUserId: null

  };

  constructor(

    private taskService: TaskService,

    private projectService: ProjectService,

    private userService: UserService,

    private dialogRef:
      MatDialogRef<EditTaskComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {}

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {

    this.taskId = this.data.taskId;

    this.loadProjects();

    this.loadStatuses();

    this.loadDesignations();

    this.loadTask();

  }

  // =========================================
  // LOAD TASK
  // =========================================

  loadTask(): void {

    this.taskService

      .getTaskById(this.taskId)

      .subscribe({

        next: (res: any) => {

          console.log('TASK RESPONSE:', res);

          this.task = {

            title: res.title,

            description: res.description,

            dueDate: res.dueDate,

            status: res.status,

            priority:
              res.priority || 'MEDIUM',

            projectId: res.projectId,

            assignedUserId:
              res.assignedUserId

          };

          this.selectedDesignation =
            res.assignedUserDesignation;

          this.filterUsersByDesignation(
            false
          );

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  

  // =========================================
  // LOAD PROJECTS
  // =========================================

  loadProjects(): void {

  this.projectService

    .getProjects(

      0,

      100,

      ''

    )

    .subscribe({

      next: (res: any) => {

        this.projects =
          res.content;

      },

      error: (err) => {

        console.log(err);

      }

    });

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

  filterUsersByDesignation(
    resetUser: boolean = true
  ): void {

    if (resetUser) {

      this.task.assignedUserId = null;

    }

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

          this.filteredUsers = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =========================================
  // UPDATE TASK
  // =========================================

  updateTask(): void {

    const payload = {

      title: this.task.title,

      description: this.task.description,

      dueDate: this.task.dueDate,

      status: this.task.status,

      priority: this.task.priority,

      projectId:
        Number(this.task.projectId),

      assignedUserId:
        Number(this.task.assignedUserId)

    };

    console.log('UPDATE PAYLOAD:', payload);

    this.taskService

      .updateTask(
        this.taskId,
        payload
      )

      .subscribe({

        next: () => {

          alert('Task Updated Successfully');

          this.dialogRef.close(true);

        },

        error: (err) => {

          console.log(err);

          alert('Failed to update task');

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