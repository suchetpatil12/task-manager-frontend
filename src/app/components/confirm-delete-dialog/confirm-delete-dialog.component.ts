import {
  Component,
  Inject
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { CommonModule }
from '@angular/common';

@Component({
  selector: 'app-confirm-delete-dialog',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './confirm-delete-dialog.component.html',

  styleUrls: [
    './confirm-delete-dialog.component.css'
  ]
})

export class ConfirmDeleteDialogComponent {

  constructor(

    private dialogRef:
      MatDialogRef<ConfirmDeleteDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {}

  confirmDelete(): void {

    this.dialogRef.close(true);

  }

  cancel(): void {

    this.dialogRef.close(false);

  }

}