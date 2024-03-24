import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn-green',
  standalone: true,
  imports: [],
  template: '<button class="green-button" (click)="handleClick()">{{text}}</button>',
  styleUrl: './green.component.scss'
})
export class GreenComponent {
  @Input() public text!:string
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit()
  }
}
