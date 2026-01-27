import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Component({
  selector: '[app-user-row]',
  imports: [],
  templateUrl: './avatar-component.html',
  styleUrl: './avatar-component.css',
})
export class AvatarComponent {
  @Input() user:User|null = null
}
