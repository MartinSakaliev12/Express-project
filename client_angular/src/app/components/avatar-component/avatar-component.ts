import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserUtils } from '../../core/utils/user.utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-user-row]',
  imports: [FormsModule],
  templateUrl: './avatar-component.html',
  styleUrl: './avatar-component.css',
})
export class AvatarComponent {
  isEditing:boolean = false;
  @Input() user:User|null = null

  newName:string|undefined = ""
  newEmail:string|undefined = ""

  
  userUtils = new UserUtils()
  
  get initial():string{
    return this.userUtils.getInitials(this.user?.name,this.user?.email)
  }
  get backGroundColor():string{
    return this.userUtils.getColors(this.initial)
  }
  stratEditing():void{
    this.newName = this.user?.name
    this.newEmail = this.user?.email
    this.isEditing=true;
  }
}
