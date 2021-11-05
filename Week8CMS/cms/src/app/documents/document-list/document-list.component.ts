import { Component, OnInit, } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
    // this.documentService.documentChangedEvent.subscribe((document: Document[]) => {
    // this.documents = document;
    // })
    // this.documents = this.documentService.getDocuments();
  }

}
