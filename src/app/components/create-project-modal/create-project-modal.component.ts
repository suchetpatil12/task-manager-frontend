import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-project-modal',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './create-project-modal.component.html',

  styleUrls: ['./create-project-modal.component.css']
})

export class CreateProjectModalComponent {

  project = {

    name: '',

    description: ''

  };

  constructor(

    private dialogRef: MatDialogRef<CreateProjectModalComponent>,

    private projectService: ProjectService

  ) {}

  createProject(): void {

    this.projectService
      .createProject(this.project)

      .subscribe({

        next: () => {

          alert('Project Created');

          this.dialogRef.close(true);

        },

        error: () => {

          alert('Failed to create project');

        }

      });

  }

  closeModal(): void {

    this.dialogRef.close();

  }

}