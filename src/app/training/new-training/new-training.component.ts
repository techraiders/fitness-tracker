import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();

  foods = [
    {label: 'Crunches'},
    {label: 'Touch Toes'},
    {label: 'Side Lunges'},
    {label: 'Burpees'}
  ];

  constructor() { }

  ngOnInit() {
  }

  onStartTraining () {
    this.trainingStart.emit();
  }

}
