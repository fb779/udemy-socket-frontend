import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string = '';
  room: string = '';

  constructor(private _router: Router, private _ws: WebSocketService) {
    // this._ws.logoutWS();
  }

  ngOnInit(): void {}

  ingresar() {
    if (!this.name) {
      alert('Usuario y sala requeridas');
      return;
    }

    // this._ws.loginWS(this.name, this.room);
    this._ws.loginWS(this.name).then((res) => {
      if (res) {
        this.name = '';
        this._router.navigate(['mensajes']);
      }
    });
  }
}
