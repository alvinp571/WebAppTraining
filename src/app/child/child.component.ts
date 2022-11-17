import { Component, Input } from '@angular/core';
import { Partner } from '../model/partner';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() partner!: Partner;

}
