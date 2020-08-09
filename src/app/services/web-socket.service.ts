import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socketStatus: boolean = false;
  constructor(private _sk: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this._sk.on('connect', () => {
      console.log('Conectado al socket');
      this.socketStatus = true;
    });

    this._sk.on('disconnect', () => {
      console.log('Desconectado al socket');
      this.socketStatus = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this._sk.emit(event, payload, callback);
  }

  listen(event: string) {
    return this._sk.fromEvent(event);
  }
}
