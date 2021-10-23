import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documentService.documentChangedEvent.subscribe((document: Document[]) => {
    this.documents = document;
    })
    this.documents = this.documentService.getDocuments();
  }

}
