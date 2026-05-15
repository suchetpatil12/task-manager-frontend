import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { TaskService } from '../../services/task.service';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-task',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],

  templateUrl: './create-task.component.html',

  styleUrls: ['./create-task.component.css']
})

export class CreateTaskComponent implements OnInit {

  // ✅ ALL USERS
  users: any[] = [];

  // ✅ FILTERED USERS
  filteredUsers: any[] = [];

  // ✅ DESIGNATIONS
  designations: string[] = [];

  // ✅ SELECTED DESIGNATION
  selectedDesignation = '';

  // ✅ PROJECT
  projectId!: number;

  // ✅ TASK
  task = {

    title: '',

    description: '',

    dueDate: '',

    status: 'TODO',

    assignedUserId: null,

    projectId: 0

  };

  constructor(

    private taskService: TaskService,

    private userService: UserService,

    private route: ActivatedRoute,

    private router: Router

  ) {}

  ngOnInit(): void {

    this.projectId = Number(
      this.route.snapshot.paramMap.get('projectId')
    );

    this.task.projectId = this.projectId;

    this.loadUsers();

    this.loadDesignations();

  }

  // ✅ LOAD USERS
  loadUsers(): void {

    this.userService
      .getUsers()

      .subscribe({

        next: (res: any) => {

          this.users = res;

          this.filteredUsers = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ✅ LOAD DESIGNATIONS
  loadDesignations(): void {

    this.userService
      .getDesignations()

      .subscribe({

        next: (res: any) => {

          this.designations = res;

        }

      });

  }

  // ✅ FILTER USERS
  filterUsersByDesignation(): void {

    if (!this.selectedDesignation) {

      this.filteredUsers = this.users;

      return;

    }

    this.filteredUsers = this.users.filter(

      user => user.designation === this.selectedDesignation

    );

    // RESET USER
    this.task.assignedUserId = null;

  }

  // ✅ CREATE TASK
  createTask(): void {

    this.taskService
      .createTask(this.task)

      .subscribe({

        next: () => {

          alert('Task Created Successfully');

          this.router.navigate([

            '/tasks',

            this.projectId

          ]);

        },

        error: (err) => {

          console.log(err);

          alert('Failed to create task');

        }

      });

  }

}