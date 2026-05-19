import { Component, Inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { ProjectService }
from '../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-project-modal',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './create-project-modal.component.html',

  styleUrls: [
    './create-project-modal.component.css'
  ]
})

export class CreateProjectModalComponent {

  // =====================================
  // PROJECT MODEL
  // =====================================

  project = {

    name: '',

    description: ''

  };

  constructor(

    private dialogRef:
      MatDialogRef<CreateProjectModalComponent>,

      private snackBar: MatSnackBar,
    private projectService:
      ProjectService,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {

    // =====================================
    // EDIT MODE
    // =====================================

    if (data?.project) {

      this.project = {

        name: data.project.name,

        description:
          data.project.description

      };

    }

  }

  // =====================================
  // CHECK EDIT MODE
  // =====================================

  isEditMode(): boolean {

    return !!this.data?.project;

  }

  // =====================================
  // CREATE / UPDATE PROJECT
  // =====================================

  submitProject(): void {

    // =====================================
    // UPDATE PROJECT
    // =====================================

    if (this.isEditMode()) {

      this.projectService

        .updateProject(
          this.data.project.id,
          this.project
        )

        .subscribe({

          next: () => {

            this.snackBar.open(

  'Project Updated Successfully',

  '✕',

  {

    duration: 3000,

    horizontalPosition: 'right',

    verticalPosition: 'top',

    panelClass: ['success-snackbar']

  }

);

            this.dialogRef.close(true);

          },

          error: () => {

            alert('Update Failed');

          }

        });

    }

    // =====================================
    // CREATE PROJECT
    // =====================================

    else {

      this.projectService

        .createProject(this.project)

        .subscribe({

          next: () => {

            this.snackBar.open(

  'Operation Failed',

  '✕',

  {

    duration: 3000,

    horizontalPosition: 'right',

    verticalPosition: 'top',

    panelClass: ['error-snackbar']

  }

);

            this.dialogRef.close(true);

          },

          error: () => {

            alert(
              'Failed to create project'
            );

          }

        });

    }

  }

  // =====================================
  // CLOSE MODAL
  // =====================================

  closeModal(): void {

    this.dialogRef.close();

  }

}