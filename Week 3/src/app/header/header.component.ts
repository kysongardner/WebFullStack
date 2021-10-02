import { Component, Output } from "@angular/core";
import { EventEmitter } from "stream";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output  featureSelected = new EventEmitter<string>()
    
    onSelect(feature: string) {
    this.featureSelected.emit(feature);
    }
}