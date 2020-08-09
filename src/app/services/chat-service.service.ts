import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  constructor(private _ws: WebSocketService) {}

  getMessages() {
    return this._ws.listen('new-message').pipe();
  }

  sendMessage(to: string, message: string) {
    let payload = {
      to,
      message,
    };

    this._ws.emit('chat-message', payload);
  }
}
