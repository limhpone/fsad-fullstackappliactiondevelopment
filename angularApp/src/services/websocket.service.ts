import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;

  connect() {
    this.socket$ = webSocket({
      url: 'ws://localhost:3000',
      deserializer: e => e.data
    });
    return this.socket$;
  }

  sendMessage(msg: string) {
    this.socket$.next(msg);
  }

  close() {
    this.socket$.complete();
  }
}
