import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from "./stop-training.component";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress : number= 0;
  timer;
  @Output() trainingExit = new EventEmitter<void>();

  constructor(private dialog : MatDialog) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress += 20;
      if (this.progress >= 100) clearInterval(this.timer);
    }, 1000);
  }

  onStop () {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: this.progress});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) this.trainingExit.emit();
    });
  }
}
