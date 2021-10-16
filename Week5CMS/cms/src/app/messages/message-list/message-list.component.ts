import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Output() messageWasSelected = new EventEmitter<Message>();
  messages: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    })
  }
  onSelected(message: Message){
    this.messageWasSelected.emit(message)
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
