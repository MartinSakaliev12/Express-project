import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar-component/avatar-component';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../core/services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-list-component',
  imports: [ AsyncPipe, AvatarComponent],
  templateUrl: './users-list-component.html',
  styleUrl: './users-list-component.css',
})
export class UsersListComponent {
  //todo create loading state
  users$:Observable<User[]>|null=null
  isAdding:boolean = false
  constructor(private userService:UserService){

  }

  loadUsers(){
    this.users$ = this.userService.getUsers()
  }
  addUser(){
    this.isAdding = true;
  }
  stopAddingUser(){
    this.isAdding = false;
  }
}
