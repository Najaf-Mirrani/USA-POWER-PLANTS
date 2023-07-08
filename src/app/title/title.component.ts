import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent implements OnInit {
  @Input()
  callbackFunction!: () => void;
  constructor() {}
  ngOnInit(): void { }
  /**
   * This is created for some extended functionality for the future but is not used now
   */
  hitToggle(): void {
    this.callbackFunction();
  }
}
