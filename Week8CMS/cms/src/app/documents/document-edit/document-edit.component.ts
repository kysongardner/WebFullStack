import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (params: Params) => {
        var id = params.id
        if (!id) {
          return;
        }

        this.originalDocument = this.documentService.getDocument(id)

        if (!this.originalDocument) {
          return
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }

    )
  }
  onCancel() {
    this.router.navigateByUrl('documents');
  }

  onSubmit(form: NgForm) {
    var value = form.value;
    var newDocument = new Document("50", value.title, value.description, value.url, value.children);
    console.log(newDocument);
    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else {
      this.documentService.addDocument(newDocument)
    }
    this.router.navigateByUrl('documents');
  }

}
