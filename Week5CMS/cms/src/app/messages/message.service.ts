import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor(messages = MOCKMESSAGES) { }

  getMessages(): Message[] {
    return this.messages.slice();
   }
   
   getMessage(id: string): Message {
      for (let message of this.messages) {
        if (message.id == id) {
          return message
        }
      }
   }

   addMessage(message: Message) {
      this.messages.push(message);
      this.messageChangedEvent.emit(this.messages.slice());
   }

}
