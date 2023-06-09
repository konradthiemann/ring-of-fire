import { Component, AfterViewInit  } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc } from 'firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements AfterViewInit{
  buttonHover: boolean = false;

  constructor(private firestore: Firestore, private router: Router) {}

  ngAfterViewInit() {
    // this.videoLoaded();
  }
  // gameID: any;
  newGame(){
    let game = new Game();
    
    addDoc(collection(this.firestore, 'games'), game.toJSON()).then((gameInfo : any) => { 
      this.router.navigateByUrl(`/game/`+ gameInfo.id);
    });
  }
}
