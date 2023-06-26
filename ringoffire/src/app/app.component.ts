import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ringoffire';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]> | undefined;

  constructor() {
  }
}
