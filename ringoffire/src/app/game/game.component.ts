import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc, updateDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { addDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { update } from 'firebase/database';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // pickCardAnimation = false;
  // currentCard: string = '';
  game!: any;
  games$: Observable<any[]> | undefined;
  gameID!: String;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    const coll = collection(this.firestore, 'games');
    this.games$ = collectionData(coll);

    this.newGame();
    this.route.params.subscribe(params => {
      // console.log(params['id']);
      this.gameID = params['id'];

      docData(doc(this.firestore, `games/${params['id']}`)).subscribe((games) => {
        this.game.currentPlayer = games['currentPlayer'];
        this.game.players = games['players'];
        this.game.stack = games['stack'];
        this.game.playedCards = games['playedCards'];
        this.game.pickCardAnimation = games['pickCardAnimation'];
        this.game.currentCard = games['currentCard'];

        console.log('das ist game', this.game);
        console.log('das ist currentPlayer', games['currentPlayer']);
        console.log('das ist players', games['players']);
        console.log('das ist stack', games['stack']);
        console.log('das ist playedCards', games['playedCards']);

      });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }

    });
  }

  saveGame() {
    updateDoc(doc(this.firestore, `games/${this.gameID}`), this.game.toJSON());
  }
}
