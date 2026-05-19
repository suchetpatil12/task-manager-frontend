import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { TaskService }
from '../../services/task.service';

@Component({
  selector: 'app-project-details-modal',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:'./project-details-modal-component.component.html',

  styleUrls: ['./project-details-modal-component.component.css'
  ]
})

export class ProjectDetailsModalComponent
implements OnInit {

  project: any;

  tasks: any[] = [];

  // =====================================
  // ANALYTICS
  // =====================================

  totalTasks = 0;

  completedTasks = 0;

  inProgressTasks = 0;

  todoTasks = 0;

  highPriority = 0;

  mediumPriority = 0;

  lowPriority = 0;

  completionPercentage = 0;

  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private taskService: TaskService,

    private dialogRef:
      MatDialogRef<ProjectDetailsModalComponent>

  ) {

    this.project = data.project;

  }

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.loadTasks();

  }

  // =====================================
  // LOAD TASKS
  // =====================================

  loadTasks(): void {

    this.taskService

      .getTasks(
        this.project.id,
        0,
        1000
      )

      .subscribe({

        next: (res: any) => {

          this.tasks = res.content;

          this.calculateAnalytics();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =====================================
  // CALCULATE ANALYTICS
  // =====================================

  calculateAnalytics(): void {

    this.totalTasks =
      this.tasks.length;

    this.completedTasks =
      this.tasks.filter(

        task =>
          task.status === 'DONE'

      ).length;

    this.inProgressTasks =
      this.tasks.filter(

        task =>
          task.status === 'IN_PROGRESS'

      ).length;

    this.todoTasks =
      this.tasks.filter(

        task =>
          task.status === 'TODO'

      ).length;

    this.highPriority =
      this.tasks.filter(

        task =>
          task.priority === 'HIGH'

      ).length;

    this.mediumPriority =
      this.tasks.filter(

        task =>
          task.priority === 'MEDIUM'

      ).length;

    this.lowPriority =
      this.tasks.filter(

        task =>
          task.priority === 'LOW'

      ).length;

    // =====================================
    // COMPLETION %
    // =====================================

    if (this.totalTasks > 0) {

      this.completionPercentage = Math.round(

        (this.completedTasks
          / this.totalTasks) * 100

      );

    }

  }

  // =====================================
  // CLOSE
  // =====================================

  closeModal(): void {

    this.dialogRef.close();

  }

}