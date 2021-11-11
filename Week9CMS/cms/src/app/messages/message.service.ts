import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private httpClient: HttpClient) {
    this.messages = MOCKMESSAGES;
   }

   getMaxId(): number {
     var maxId = 0;

     this.messages.forEach((message) => {
       var currentId = +message.id;
       if (currentId > maxId) {
         maxId = currentId;
       }
     });
     return maxId;
   }

   storeMessages() {
    this.httpClient.put('https://fishsticks-4c3c5-default-rtdb.firebaseio.com/messages.json', this.messages)
    .subscribe(() => {
      var messagesListClone = this.messages.slice();
      this.messageChangedEvent.next(messagesListClone);
    })
  }

  getMessages(): Message[] {
    this.httpClient.get<Message[]>('https://fishsticks-4c3c5-default-rtdb.firebaseio.com/messages.json')
    .subscribe((messages: Message[]) => {
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      // HOW TO DO SORT METHOD??
      this.messages.sort();
      var messagesListClone = this.messages.slice();
    },
    (error: any) => {
      console.log(error);
    }
    )
    return this.messages;
  }
   
   getMessage(id: string): Message | null{
      for (let message of this.messages) {
        if (message.id == id) {
          return message;
        }
      }
      return null;
   }

   addMessage(message: Message) {
      this.storeMessages();
   }

}
