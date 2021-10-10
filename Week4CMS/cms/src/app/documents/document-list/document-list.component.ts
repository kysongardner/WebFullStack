import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() documentWasSelected = new EventEmitter<Document>();
  documents: Document[] = [new Document("123", "Document 1", "Document 1 Description", "www.kysongardner.com", null),
                            new Document("124", "Document 2", "Document 2 Description", "www.kysongardner1.com", null),
                            new Document("125", "Document 3", "Document 3 Description", "www.kysongardner2.com", null),
                            new Document("126", "Document 4", "Document 4 Description", "www.kysongardner3.com", null),
                            new Document("127", "Document 5", "Document 5 Description", "www.kysongardner4.com", null)]

  constructor() { }

  ngOnInit(): void {
  }
  onSelected(document: Document) {
    this.documentWasSelected.emit(document);
  }

}
