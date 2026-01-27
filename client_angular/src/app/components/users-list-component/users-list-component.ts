import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar-component/avatar-component';

@Component({
  selector: 'app-users-list-component',
  imports: [AvatarComponent],
  templateUrl: './users-list-component.html',
  styleUrl: './users-list-component.css',
})
export class UsersListComponent {

}
