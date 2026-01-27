import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar-component/avatar-component';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list-component',
  imports: [ FormsModule, AvatarComponent],
  templateUrl: './users-list-component.html',
  styleUrl: './users-list-component.css',
})
export class UsersListComponent {
  //todo create loading state
  //todo add messages on error
  users:User[]|null = null
  users$:Observable<User[]>|null=null
  isAdding:boolean = false

  inputName:string = ""
  inputEmail:string = ""
  constructor(private userService:UserService){

  }

  loadUsers(){
    this.userService.getUsers().subscribe(data => {this.users=data; console.log(this.users)})
    
  }
  startAddingUser(){
    this.isAdding = true;

  }
  stopAddingUser(){
    this.isAdding = false;
  }
  addUser(){
    console.log('adawdawdawd')
    this.stopAddingUser()
    this.userService.createUser(this.inputName,this.inputEmail).subscribe(data=>this.users?.push(data))
    
  }
}
