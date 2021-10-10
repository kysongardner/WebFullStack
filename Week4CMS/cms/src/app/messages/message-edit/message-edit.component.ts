import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
 @ViewChild('subject', { static: false}) subjectInputRef!: ElementRef;
 @ViewChild('msgText', { static: false}) messageInputRef!: ElementRef;
 @Output() addMessageEvent = new EventEmitter<Message>();
 currentSender: string = "Kyson Gardner"
  constructor() { }

  ngOnInit(): void {
  }
  onSendMessage() {
    const subjectForMessage = this.subjectInputRef.nativeElement.value;
    const msgTextForMessage = this.messageInputRef.nativeElement.value;
    const message = new Message("1234", subjectForMessage, msgTextForMessage, this.currentSender);
    this.addMessageEvent.emit(message)
  }
  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.value = "";
  }
}