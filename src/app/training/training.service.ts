import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

import { Exercise } from "./exercise.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();

  private _availableExercises: Array<Exercise> = [
    { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
    { id: "touch-toes", name: "Touch Toes", duration: 10, calories: 15 },
    { id: "side-lunges", name: "Side Lunges", duration: 20, calories: 18 },
    { id: "burpees", name: "Burpees", duration: 60, calories: 8 }
  ];
  private _runningExercise: Exercise;
  private _exercises: Array<Exercise> = [];

  constructor(private db: AngularFirestore) {}

  get availableExercises() {
    return this._availableExercises.slice();
  }

  set availableExercises(value) {
    this._availableExercises = value;
  }

  fetchAvailableExercises() {
    this.db
      .collection("availableExercises")
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  get runningExercise() {
    return { ...this._runningExercise };
  }
  set runningExercise(value) {
    this._runningExercise = { ...value };
  }

  get exercises() {
    return [...this._exercises];
  }

  startExercises(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this._exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this._exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled"
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
}
