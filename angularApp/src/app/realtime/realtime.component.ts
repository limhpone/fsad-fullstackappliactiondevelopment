// realtime.component.ts
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realtime',
  imports: [FormsModule, CommonModule],
  template: `
    <h2>WebSocket Demo</h2>
    <input [(ngModel)]="message" placeholder="Type a message" />
    <button (click)="send()">Send</button>
    <ul>
      <li *ngFor="let msg of messages">{{ msg }}</li>
    </ul>
  `
})
export class RealtimeComponent implements OnInit {
  message = '';
  messages: string[] = [];
  private userEmail = 'anonymous';

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        this.userEmail = parsed.email || this.userEmail;
      } catch {
        // keep default
      }
    }

    this.wsService.connect().subscribe({
      next: (msg: any) => {
          if (msg) {
            const clean = msg.replace(/^"|"$/g, '');
            // Message is already prefixed by sender or SYSTEM
            this.messages.push(clean);
          } else {
            this.messages.push(`SYSTEM: ${msg}`);
          }
      },
      error: (err) => console.error(err),
      complete: () => console.log('Connection closed'),
    });
  }

  send() {
    const payload = `${this.userEmail}: ${this.message}`;
    this.wsService.sendMessage(payload);
    this.message = '';
  }
}
