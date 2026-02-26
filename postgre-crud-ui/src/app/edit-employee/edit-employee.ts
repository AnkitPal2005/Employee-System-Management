import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './edit-employee.html'
})
export class EditEmployee {

  constructor(
    public dialogRef: MatDialogRef<EditEmployee>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
  this.isEditMode = this.data && this.data.id && this.data.id > 0;
}
isEditMode = false;
  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}