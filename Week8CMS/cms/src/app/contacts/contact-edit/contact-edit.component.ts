import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  contact: Contact;
  editMode: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        var id = params.id
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(id)

        if (!this.originalContact) {
          return
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if(this.contact.group != null){
          this.groupContacts = this.contact.group;
        }
      }
    )
  }
  onCancel() {
    this.router.navigateByUrl('contacts');
  }

  onSubmit(form: NgForm) {
    var value = form.value;
    var newContact = new Contact(Math.floor(Math.random() * 10000000).toString(), value.name, value.email, value.phone, value.url, this.groupContacts);
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else {
      this.contactService.addContact(newContact);
    }
    this.router.navigateByUrl('contacts');
  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }
    if (this.contact && newContact.id === this.contact.id){
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if(invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

}
