import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  MatCardModule
} from '@angular/material/card';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatMenuModule
} from '@angular/material/menu';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import { ProjectService }
from '../../services/project.service';

import { AuthService }
from '../../services/auth.service';

import { CreateProjectModalComponent }
from '../../components/create-project-modal/create-project-modal.component';

import { ConfirmDeleteDialogComponent }
from '../../components/confirm-delete-dialog/confirm-delete-dialog.component';

import { ProjectDetailsModalComponent }
from '../../components/project-details-modal-component/project-details-modal-component.component';

import { ManageTeamModalComponent }
from '../../components/manage-team-modal/manage-team-modal.component';

@Component({
  selector: 'app-projects',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule,

    MatCardModule,

    MatButtonModule,

    MatDialogModule,

    MatMenuModule,

    MatIconModule

  ],

  templateUrl: './projects.component.html',

  styleUrls: ['./projects.component.css']

})

export class ProjectsComponent
implements OnInit {

  // =========================================
  // DATA
  // =========================================

  projects: any[] = [];

  currentPage = 0;

  pageSize = 8;

  totalPages = 0;

  searchKeyword = '';

  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(

    public authService: AuthService,

    private projectService: ProjectService,

    private router: Router,

    private dialog: MatDialog,

    private snackBar: MatSnackBar

  ) {}

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {

    this.loadProjects();

  }

  // =========================================
  // LOAD PROJECTS
  // =========================================

  loadProjects(): void {

    this.projectService

      .getProjects(

        this.currentPage,

        this.pageSize,

        this.searchKeyword

      )

      .subscribe({

        next: (res: any) => {

          this.projects =
            res.content;

          this.totalPages =
            res.totalPages;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =========================================
  // SEARCH PROJECTS
  // =========================================

  searchProjects(): void {

    this.currentPage = 0;

    this.loadProjects();

  }

  // =========================================
  // PAGINATION
  // =========================================

  nextPage(): void {

    if (

      this.currentPage <

      this.totalPages - 1

    ) {

      this.currentPage++;

      this.loadProjects();

    }

  }

  previousPage(): void {

    if (this.currentPage > 0) {

      this.currentPage--;

      this.loadProjects();

    }

  }

  // =========================================
  // OPEN TASKS
  // =========================================

  openTasks(projectId: number): void {

    this.router.navigate([
      '/tasks',
      projectId
    ]);

  }

  // =========================================
  // CREATE PROJECT
  // =========================================

  openCreateProjectModal(): void {

    const dialogRef = this.dialog.open(

      CreateProjectModalComponent,

      {

        width: '560px',

        panelClass:
          'custom-dialog-container'

      }

    );

    dialogRef.afterClosed()

      .subscribe((result: any) => {

        if (result) {

          this.loadProjects();

        }

      });

  }

  // =========================================
  // EDIT PROJECT
  // =========================================

  editProject(project: any): void {

    const dialogRef = this.dialog.open(

      CreateProjectModalComponent,

      {

        width: '560px',

        panelClass:
          'custom-dialog-container',

        data: {

          project: project

        }

      }

    );

    dialogRef.afterClosed()

      .subscribe((result: any) => {

        if (result) {

          this.loadProjects();

        }

      });

  }

  // =========================================
  // DELETE PROJECT
  // =========================================

  deleteProject(projectId: number): void {

    const dialogRef = this.dialog.open(

      ConfirmDeleteDialogComponent,

      {

        width: '420px'

      }

    );

    dialogRef.afterClosed()

      .subscribe((confirmed) => {

        if (!confirmed) {

          return;

        }

        this.projectService

          .deleteProject(projectId)

          .subscribe({

            next: () => {

              this.loadProjects();

              this.snackBar.open(

                'Project Deleted Successfully',

                '✕',

                {

                  duration: 3000,

                  horizontalPosition: 'right',

                  verticalPosition: 'top',

                  panelClass: ['success-snackbar']

                }

              );

            },

            error: () => {

              this.snackBar.open(

                'Failed To Delete Project',

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

      });

  }

  // =========================================
  // MANAGE TEAM
  // =========================================

  manageTeam(project: any): void {

    this.dialog.open(

      ManageTeamModalComponent,

      {

        width: '760px',

        panelClass:
          'custom-dialog-container',

        data: {

          project: project

        }

      }

    );

  }

  // =========================================
  // VIEW DETAILS
  // =========================================

  viewDetails(project: any): void {

    this.dialog.open(

      ProjectDetailsModalComponent,

      {

        width: '760px',

        panelClass:
          'custom-dialog-container',

        data: {

          project: project

        }

      }

    );

  }

}