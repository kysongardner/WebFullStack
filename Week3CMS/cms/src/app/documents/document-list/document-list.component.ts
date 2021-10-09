import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() documentWasSelected = new EventEmitter<Document>();
  documents: Document[] = []

  constructor() { }

  ngOnInit(): void {
  }
  onSelected(document: Document){
    this.documentWasSelected.emit(document)
  }

}
