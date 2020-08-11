import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socketStatus: boolean = false;
  private user: User = null;

  constructor(private _router: Router, private _sk: Socket) {
    this.loadUserStorage();
    this.checkStatus();
  }

  checkStatus() {
    this._sk.on('connect', () => {
      this.socketStatus = true;
      this.loadUserStorage();
    });

    this._sk.on('disconnect', () => {
      this.socketStatus = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    // payload.tk = 'mi token de envio';
    this._sk.emit(event, payload, callback);
  }

  listen(event: string) {
    return this._sk.fromEvent(event);
  }

  loginWS(name: string, room?: string) {
    return new Promise((resolve, reject) => {
      this.emit('setup-user', { name, room }, (res) => {
        if (res) {
          this.user = new User(res.id, res.name, res.room);
          this.saveUserStorage(this.user);
          return resolve(true);
        }
        return reject(false);
      });
    });
  }

  logoutWS() {
    this.deleteUserStorage();

    this.emit('setup-user', { name: 'No-Name' }, () => {
      this._router.navigateByUrl('');
    });

    // this.emit('user-disconnect', {}, (res) => {
    //   console.log('emision de desconeccion', res);
    // });
  }

  saveUserStorage(payload: Object) {
    const data = JSON.stringify(payload);
    localStorage.setItem(environment.key_storage.user, data);
  }

  loadUserStorage() {
    if (localStorage.getItem(environment.key_storage.user)) {
      this.user = JSON.parse(
        localStorage.getItem(environment.key_storage.user)
      );
      this.loginWS(this.user.name, this.user.room);
    }
  }

  deleteUserStorage() {
    this.user = null;
    localStorage.removeItem(environment.key_storage.user);
  }

  getUser() {
    return this.user;
  }
}
