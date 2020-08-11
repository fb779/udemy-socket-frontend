import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { ChatServiceService } from './services/chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sk-frontend';

  constructor(private _charService: ChatServiceService) {}

  ngOnInit() {
    this._charService.getPrivateMessages().subscribe((msg) => {
      console.log('mensajes privados', msg);
    });
  }
}
