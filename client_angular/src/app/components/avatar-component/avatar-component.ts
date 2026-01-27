import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserUtils } from '../../core/utils/user.utils';

@Component({
  selector: '[app-user-row]',
  imports: [],
  templateUrl: './avatar-component.html',
  styleUrl: './avatar-component.css',
})
export class AvatarComponent {
  @Input() user:User|null = null
  userUtils = new UserUtils()
  get initial():string{
    return this.userUtils.getInitials(this.user?.name,this.user?.email)
  }
  get backGroundColor():string{
    return this.userUtils.getColors(this.initial)
  }

}
