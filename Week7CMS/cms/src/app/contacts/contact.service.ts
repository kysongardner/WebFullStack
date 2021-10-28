import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  maxContactId: number;
  ContactListChangedEvent = new Subject<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  ngOnInit() {
    this.contacts = this.getContacts();
  }

  deleteContact(Contact: Contact) {
    if(Contact == undefined || null){
      return;
    }
    var pos = this.contacts.indexOf(Contact)
    if (pos < 0){
      return;
    }
    this.contacts.splice(pos, 1);
    var ContactsListClone = this.contacts.slice();
    this.ContactListChangedEvent.next(ContactsListClone)
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if ((originalContact || newContact) == undefined || null) {
      return;
    }

    var pos = this.contacts.indexOf(originalContact);

    if (pos < 0){
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    var ContactsListClone = this.contacts.slice();
    this.ContactListChangedEvent.next(ContactsListClone);
  }

  addContact(newContact: Contact) {
    if (newContact == undefined || null) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId;
    this.contacts.push(newContact);
    var ContactsListClone = this.contacts.slice();

    this.ContactListChangedEvent.next(ContactsListClone);
  }

  getMaxId(): number {
    var maxId = 0;

    this.contacts.forEach((contact) => {
      var currentId = +contact.id
      if (currentId > maxId) {
        maxId = currentId
      }
    })
    return maxId;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string) {
    return this.contacts.find(contact => contact.id === id ? contact : null);
  }

}
