import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedFeatureEvent = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }
  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent)
  }

}
