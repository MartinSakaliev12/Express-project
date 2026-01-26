import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersListComponent } from './components/users-list-component/users-list-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,UsersListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'client_angular';
}
