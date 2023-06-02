import { Component, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements AfterViewInit{
  buttonHover: boolean = false;
  constructor(private router: Router) {}

  ngAfterViewInit() {
    // this.videoLoaded();
  }

  newGame(){
    this.router.navigateByUrl('/game');
  }
}
