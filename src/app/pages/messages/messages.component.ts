import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  us: User;
  constructor(public _ws: WebSocketService) {
    this.us = this._ws.getUser();
  }

  ngOnInit(): void {}
}
