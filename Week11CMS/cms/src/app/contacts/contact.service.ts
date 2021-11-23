import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  maxContactId = 0;
  contactListChangedEvent = new Subject<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.contacts = this.getContacts();
  }

  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.storeContacts();
        }
      );
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
    var contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    // newContact.id = `${this.maxContactId}`;
    this.contacts.push(newContact);
    var contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  getMaxId(): number {
    var maxId = 0;

    this.contacts.forEach((contact) => {
      var currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    })
    return maxId;
  }

  storeContacts() {
    this.httpClient.put('http://localhost:3000/contacts/', this.contacts)
    .subscribe(() => {
      var contactsListClone = this.contacts.slice();

      this.contactListChangedEvent.next(contactsListClone);
    })
  }

  getContacts():Contact[] {
    this.httpClient.get<Contact[]>('http://localhost:3000/contacts/')
    .subscribe((contacts:Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      
      this.contacts.sort((a,b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
      var contactsListClone = this.contacts.slice();

      this.contactListChangedEvent.next(contactsListClone);
    },
    (error: any) => {
    }
    )
    return this.contacts;
  }

  getContact(id: string) {
    return this.contacts.find(contact => contact.id === id ? contact : null);
  }

}
