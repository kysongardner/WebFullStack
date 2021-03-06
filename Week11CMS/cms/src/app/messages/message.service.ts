import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private httpClient: HttpClient) {
  }


  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient.post<{ aMessage: string, message: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          console.log(message);
          // add new message to messages
          this.messages.push(responseData.message);
          var messagesListClone = this.messages.slice();
          this.messageChangedEvent.next(messagesListClone);
          this.storeMessages();
        }
      );
  }

  getMessages(): Message[] {
    this.httpClient.get<Message[]>('http://localhost:3000/messages/')
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();

        this.messages.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        var messagesListClone = this.messages.slice();
        this.messageChangedEvent.next(messagesListClone);
      },
        (error: any) => {
          console.log(error);
        }
      )
    return this.messages;
  }



  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Message to the id of the old message
    newMessage.id = originalMessage.id;
    // newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.httpClient.put('http://localhost:3000/messages/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
          this.storeMessages();
        }
      );
  }
  deleteMessage(message: Message) {

    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
          this.storeMessages();
        }
      );
  }
  storeMessages() {
    this.httpClient.get('http://localhost:3000/messages/')
      .subscribe(() => {
        var messagesListClone = this.messages.slice();
        this.messageChangedEvent.next(messagesListClone);
      })
  }

  getMaxId(): number {
    var maxId = 0;

    this.messages.forEach((message) => {
      var currentId = +message?.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  getMessage(id: string): Message | null {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }
    return null;
  }

}
