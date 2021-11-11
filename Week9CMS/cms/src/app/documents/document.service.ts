import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  maxDocumentId = 0;
  documentListChangedEvent = new Subject<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor(private httpClient: HttpClient) {
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    // newDocument.id = `${this.maxDocumentId}`;
    this.documents.push(newDocument);
    var documentsListClone = this.documents.slice();

    this.storeDocuments();
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

  storeDocuments() {
    this.httpClient.put('https://fishsticks-4c3c5-default-rtdb.firebaseio.com/documents.json', this.documents)
    .subscribe(() => {
      var documentsListClone = this.documents.slice();

      this.documentListChangedEvent.next(documentsListClone);
    })
  }

  getDocuments(): Document[] {
    this.httpClient.get<Document[]>('https://fishsticks-4c3c5-default-rtdb.firebaseio.com/documents.json')
    .subscribe((documents: Document[]) => {
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      // HOW TO DO SORT METHOD??
      this.documents.sort();
      var documentsListClone = this.documents.slice();

      this.documentListChangedEvent.next(documentsListClone);
    },
    (error: any) => {
      console.log(error);
    }
    )
    return this.documents;
  }

  getDocument(id: string) {
    return this.documents.find(document => document.id === id ? document : null);
  }
}
