import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { ChatServiceService } from '../../services/chat-service.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  listUsers$: Observable<any>;

  constructor(private _chatService: ChatServiceService) {}

  ngOnInit(): void {
    this.listUsers$ = this._chatService.getOnlineUsers();

    this._chatService.getListUsers();
  }
}
