// import { Component, OnInit,ChangeDetectorRef, inject } from '@angular/core';
// import { EmployeeService} from '../services/employee';
// import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';
// import { EditEmployee } from '../edit-employee/edit-employee';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { CustomSnackbar } from '../custom-snackbar/custom-snackbar';

// @Component({
//   selector: 'app-employees',
//   standalone:true,
//   imports: [MatTableModule,
//     MatButtonModule,
//     MatIconModule,MatDialogModule,
   
//   MatFormFieldModule,
//   MatInputModule,
//   FormsModule,
//     MatToolbarModule,
//     MatCardModule,
//     MatSnackBarModule,
//     MatPaginatorModule,
   
// ],
//   templateUrl: './employees.html',
//   styleUrl: './employees.css',
// })
// export class Employees implements OnInit {
// dataSource = new MatTableDataSource<any>();
// displayedColumns: string[] = ['name', 'email', 'salary','actions'];
// @ViewChild(MatPaginator) paginator!: MatPaginator;
// constructor(private employeeService:EmployeeService,private dialog:MatDialog,  private snackBar: MatSnackBar){}
// pageSize=5;
// currentPage=1;
// totalCount=0;
//   ngOnInit(): void {
//     this.loadEmployees(1);
//     this.dataSource.filterPredicate = (data: any, filter: string) => {
//     return (
//       data.name.toLowerCase().includes(filter) ||
//       data.email.toLowerCase().includes(filter) ||
//       data.salary.toString().includes(filter)
//     );
//   };
//   }
//   cdr=inject(ChangeDetectorRef);
//   loadEmployees(page:number=1){
//     this.employeeService.getEmployeesPaged(page,this.pageSize).subscribe({
//       next:(response)=>{
//         console.log("Api Response",response);
//         this.dataSource.data = response.data;
//          this.totalCount =response.totalCount; 
//          this.currentPage = page;
//         this.cdr.detectChanges();
//       },
//       error:(err)=>{
//         console.error("Api Error",err);
//       }
//     });
//   }
// delete(id: number) {

//   const dialogRef = this.dialog.open(ConfirmDialog, {
//     width: '350px',
//     data: {
//       message: 'Are you sure you want to delete this employee?'
//     }
//   });

//   dialogRef.afterClosed().subscribe(result => {

//     if (result) {

//       this.employeeService.deleteEmployee(id).subscribe({
//         next: () => {
//           this.loadEmployees();
//           this.showMessage(
//   'Success!',
//   'Employee Deleted Successfully',
//   'success'
// );
//         },
//         error: err => console.error(err)
//       });

//     }

//   });

// }
// edit(emp: any) {

// const dialogRef = this.dialog.open(EditEmployee, {
//   width: '450px',
//   data: { ...emp }
// });
//   dialogRef.afterClosed().subscribe({
//     next: (result) => {

//       if (!result) return;

//       this.employeeService.updateEmployee(result.id, result).subscribe({
//         next: () => {
//           this.showMessage(
//   'Success!',
//   'Employee Updated Successfully',
//   'success'
// );
//           this.loadEmployees();
//         },
//         error: err => console.error(err)
//       });

//     }
//   });
// }
// openAddDialog() {

//   const dialogRef = this.dialog.open(EditEmployee, {
//     width: '450px',
//     data: {
//       id: 0,
//       name: '',
//       email: '',
//       salary: 0
//     }
//   });

//   dialogRef.afterClosed().subscribe({
//     next: (result) => {

//       if (!result) return;

//       this.employeeService.createEmployee(result).subscribe({
//         next: () => {
//           this.showMessage(
//   'Success!',
//   'Employee Added Successfully',
//   'success'
// );
//           this.loadEmployees();
//         },
//         error: err => console.error(err)
//       });

//     }
//   });

// }
// showMessage(title: string, message: string, type: 'success' | 'error') {

//   this.snackBar.openFromComponent(CustomSnackbar, {
//     duration: 4000,
//     horizontalPosition: 'right',
//     verticalPosition: 'top',
//     data: { title, message, type }
//   });

// }
// applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();
// }
// onPageChange(event: any) {

//   const pageIndex = event.pageIndex + 1;
//   const pageSize = event.pageSize;

//   this.pageSize = pageSize;

//   this.loadEmployees(pageIndex);

// }
// }
import { Component, OnInit,ChangeDetectorRef, inject } from '@angular/core';
import { EmployeeService } from '../services/employee';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { EditEmployee } from '../edit-employee/edit-employee';
import { CustomSnackbar } from '../custom-snackbar/custom-snackbar';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectionModel } from '@angular/cdk/collections';
import{MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,   
  MatInputModule,
  MatCheckboxModule,
  CommonModule
    
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {

  employees: any[] = [];

  displayedColumns: string[] = ['select','name', 'email', 'salary', 'actions'];

  pageSize = 5;
  currentPage = 1;
  totalCount = 0;
  searchText='';
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  selection = new SelectionModel<any>(true, []);
cdr=inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.loadEmployees(1);
    
  }


  loadEmployees(page: number = 1) {
    this.employeeService.getEmployeesPaged(page, this.pageSize,this.searchText)
      .subscribe({
        next: (response) => {
          this.employees = response.data;
          this.totalCount = response.totalCount;
          this.currentPage = page;
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
  }

 
  onPageChange(event: any) {
    const pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadEmployees(pageIndex);
  }


  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this employee?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          this.showMessage('Success!', 'Employee Deleted Successfully', 'success');
          this.loadEmployees(this.currentPage);
        });
      }
    });
  }

 
  edit(emp: any) {
    const dialogRef = this.dialog.open(EditEmployee, {
      width: '450px',
      data: { ...emp }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.employeeService.updateEmployee(result.id, result).subscribe(() => {
        this.showMessage('Success!', 'Employee Updated Successfully', 'success');
        this.loadEmployees(this.currentPage);
      });
    });
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(EditEmployee, {
      width: '450px',
      data: { id: 0, name: '', email: '', salary: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.employeeService.createEmployee(result).subscribe(() => {
        this.showMessage('Success!', 'Employee Added Successfully', 'success');
        this.loadEmployees(this.currentPage);
      });
    });
  }


  showMessage(title: string, message: string, type: 'success' | 'error') {
    this.snackBar.openFromComponent(CustomSnackbar, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: { title, message, type }
    });
  }
  onSearch(event: any) {
  this.searchText = event.target.value;
  this.loadEmployees(1);
}
toggleAll(event: any) {
  if (event.checked) {
    this.employees.forEach((row: any) => this.selection.select(row));
  } else {
    this.selection.clear();
  }
}
deleteSelected() {

  const ids = this.selection.selected.map(x => x.id);

  if(ids.length === 0){
    this.showMessage('Error','No rows selected','error');
    return;
  }

  const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this Selected employees?' }
    });
dialogRef.afterClosed().subscribe(result=>{
  if(result){
     this.employeeService.deleteMultiple(ids).subscribe(()=>{
    this.showMessage('Success','Employees Deleted','success');
    this.loadEmployees();
    this.selection.clear();
    this.cdr.detectChanges();
  });
  }
})
 
}
}
