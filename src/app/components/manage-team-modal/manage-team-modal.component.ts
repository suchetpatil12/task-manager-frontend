import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { ProjectService }
from '../../services/project.service';

import { UserService }
from '../../services/user.service';

@Component({
  selector: 'app-manage-team-modal',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './manage-team-modal.component.html',

  styleUrls: [
    './manage-team-modal.component.css'
  ]
})

export class ManageTeamModalComponent
implements OnInit {

  project: any;

  members: any[] = [];

  users: any[] = [];

  selectedUserId: number | null = null;

  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private projectService:
      ProjectService,

    private userService:
      UserService,

    private dialogRef:
      MatDialogRef<ManageTeamModalComponent>

  ) {

    this.project = data.project;

  }

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.loadMembers();

    this.loadUsers();

  }

  // =====================================
  // LOAD MEMBERS
  // =====================================

  loadMembers(): void {

    this.projectService

      .getProjectMembers(
        this.project.id
      )

      .subscribe({

        next: (res: any) => {

          this.members = res;

        }

      });

  }

  // =====================================
  // LOAD USERS
  // =====================================

  loadUsers(): void {

    this.userService

      .getUsers()

      .subscribe({

        next: (res: any) => {

          this.users = res;

        }

      });

  }

  // =====================================
  // ADD MEMBER
  // =====================================

  addMember(): void {

    if (!this.selectedUserId) {

      return;

    }

    this.projectService

      .addProjectMember(

        this.project.id,

        this.selectedUserId

      )

      .subscribe({

        next: () => {

          this.loadMembers();

          this.selectedUserId = null;

        }

      });

  }

  // =====================================
  // REMOVE MEMBER
  // =====================================

  removeMember(userId: number): void {

    this.projectService

      .removeProjectMember(

        this.project.id,

        userId

      )

      .subscribe({

        next: () => {

          this.loadMembers();

        }

      });

  }

  // =====================================
  // CLOSE
  // =====================================

  closeModal(): void {

    this.dialogRef.close();

  }

}