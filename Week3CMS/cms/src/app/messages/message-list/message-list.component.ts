import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Output() messageWasSelected = new EventEmitter<Message>();
  messages: Message[] = [ new Message("1","subject", "This is a message", "I am the sender!!"),
  new Message("1","subject", "This is a message", "I am the sender!!"), new Message("1","subject", "This is a message", "I am the sender!!")];

  constructor() { }

  ngOnInit(): void {
  }
  onSelected(message: Message){
    this.messageWasSelected.emit(message)
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
