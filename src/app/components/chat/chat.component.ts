import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  textMessage: string = '';
  subs: Subscription;
  listMessages: any[] = [];
  chatMessages: HTMLElement;

  constructor(private _chatServices: ChatServiceService) {}

  ngOnInit() {
    this.chatMessages = document.getElementById('chat-messages');
    this.subs = this._chatServices.getMessages().subscribe((msg) => {
      this.listMessages.push(msg);
      // this.listMessages.unshift(msg);
      setTimeout(() => {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
      }, 0);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  enviar() {
    if (this.textMessage.length < 1) {
      return;
    }

    this._chatServices.sendMessage(this.textMessage);
    this.textMessage = '';
  }
}
