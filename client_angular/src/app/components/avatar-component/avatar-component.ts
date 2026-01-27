import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserUtils } from '../../core/utils/user.utils';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: '[app-user-row]',
  imports: [FormsModule],
  templateUrl: './avatar-component.html',
  styleUrl: './avatar-component.css',
})
export class AvatarComponent {
  isEditing:boolean = false;
  @Input() user:User|null = null
  @Output() deleteUserEvent = new EventEmitter<string|undefined>()

  newName:string|undefined = ""
  newEmail:string|undefined = ""
  
  userUtils = new UserUtils()
  
  constructor(private userService:UserService){

  }

  get initial():string{
    return this.userUtils.getInitials(this.user?.name,this.user?.email)
  }
  get backGroundColor():string{
    return this.userUtils.getColors(this.initial)
  }
  startEditing():void{
    this.newName = this.user?.name
    this.newEmail = this.user?.email
    this.isEditing=true;
  }
  stopEditing():void{
    this.isEditing= false;
  }
  edit(){
    this.stopEditing()
    return this.userService.editUser(this.newName,this.newEmail,this.user?.id).subscribe(data=>this.user=data)
  }
  deleteUser(){
    console.log(this.user?.id)
    
    return this.userService.deleteUser(this.user?.id).subscribe(data => this.deleteUserEvent.emit(this.user?.id))
  }
}
