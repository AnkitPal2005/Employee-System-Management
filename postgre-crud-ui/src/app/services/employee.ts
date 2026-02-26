import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl='https://localhost:7035/api/Employees';
  constructor(private http:HttpClient){};
  getEmployees(){
    return this.http.get<any[]>(this.apiUrl);
  }
 createEmployee(emp: any) {
   return this.http.post(this.apiUrl, emp);
}
  updateEmployee(id:number,emp:any){
    return this.http.put(`${this.apiUrl}/${id}`,emp);
  }
  deleteEmployee(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getEmployeesPaged(page: number, pageSize: number,search:string) {
  return this.http.get<any>(
    `${this.apiUrl}/paged?page=${page}&pageSize=${pageSize}&search=${search}`
  );
}
getTotalEmployees() {
  return this.http.get<number>(`${this.apiUrl}/count`);
}
deleteMultiple(ids: number[]) {
  return this.http.request('delete', `${this.apiUrl}`, { body: ids });
}
}
