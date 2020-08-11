import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  constructor(private _ws: WebSocketService) {}

  sendMessage(message: string) {
    let payload = {
      to: this._ws.getUser().name,
      message,
    };

    this._ws.emit('chat-message', payload);
  }

  getMessages() {
    return this._ws.listen('new-message').pipe(
      map((el: any) => {
        if (el.to === this._ws.getUser().name) {
          el.class = true;
        } else {
          el.class = false;
        }

        return el;
      })
    );
  }

  getPrivateMessages() {
    return this._ws.listen('private-message');
  }

  getOnlineUsers() {
    return this._ws.listen('online-users');
  }

  getListUsers() {
    return this._ws.emit('list-users');
  }
}
