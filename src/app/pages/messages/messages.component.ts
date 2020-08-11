import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  us: User;
  constructor(public _ws: WebSocketService) {
    this.us = this._ws.getUser();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('Destruir Mensajes Component');
  }

  logOut() {
    this._ws.logoutWS();
  }
}
