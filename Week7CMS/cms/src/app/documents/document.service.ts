import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  deleteDocument(document: Document) {
    if(document == undefined || null){
      return;
    }
    var pos = this.documents.indexOf(document)
    if (pos < 0){
      return;
    }
    this.documents.splice(pos, 1);
    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if ((originalDocument || newDocument) == undefined || null) {
      return;
    }

    var pos = this.documents.indexOf(originalDocument);

    if (pos < 0){
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    var documentsListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentsListClone);
  }

  getMaxId(): number {
    var maxId = 0;

    this.documents.forEach((document) => {
      var currentId = +document.id
      if (currentId > maxId) {
        maxId = currentId
      }
    })
    return maxId;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string) {
    return this.documents.find(document => document.id === id ? document : null);
  }
}
