import { Component, OnInit,ChangeDetectorRef, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../services/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalEmployees = 0;

  constructor(private employeeService: EmployeeService) {}
cdr=inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.employeeService.getTotalEmployees().subscribe(total => {
      this.totalEmployees = total;
      this.cdr.detectChanges();
    });
  }
}