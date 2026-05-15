import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  project = {

    name: '',

    description: ''

  };

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  createProject() {

    this.projectService
      .createProject(this.project)

      .subscribe({

        next: () => {

          alert('Project Created');

          this.router.navigate(['/projects']);

        },

        error: () => {

          alert('Failed to create project');

        }

      });

  }

}