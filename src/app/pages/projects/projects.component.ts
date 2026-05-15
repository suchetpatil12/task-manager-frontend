import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProjectService } from '../../services/project.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CreateProjectModalComponent } from '../../components/create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: any[] = [];

  constructor(
    public authService: AuthService,
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.projectService.getProjects()
      .subscribe((res: any) => {

        this.projects = res;

      });

  }

  // 🔥 dynamic navigation
  openTasks(projectId: number) {

    this.router.navigate(['/tasks', projectId]);

  }

  openCreateProjectModal(): void {

    const dialogRef = this.dialog.open(

      CreateProjectModalComponent,

      {

        width: '560px',

        panelClass: 'custom-dialog-container'

      }

    );

    dialogRef.afterClosed()

      .subscribe((result: any) => {

        if (result) {

          window.location.reload();

        }

      });

  }

}