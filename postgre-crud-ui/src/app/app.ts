import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employees } from "./employees/employees";
import { Navbar } from './navbar/navbar';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,Navbar],
 template: `
 <app-navbar></app-navbar>
 <!-- <app-employees></app-employees> -->
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('postgre-crud-ui');
}
