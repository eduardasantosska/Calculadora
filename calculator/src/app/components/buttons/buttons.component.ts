import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Input() button: any;
  @Output() clickButton = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(value): void {
    this.clickButton.emit(value);
  }

}
