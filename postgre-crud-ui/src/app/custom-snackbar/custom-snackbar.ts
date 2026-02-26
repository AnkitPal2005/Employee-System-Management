import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [MatSnackBarModule, MatIconModule, MatButtonModule,CommonModule],
  templateUrl: './custom-snackbar.html',
  styleUrl: './custom-snackbar.css'
})
export class CustomSnackbar {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

}