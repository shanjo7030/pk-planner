import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poker-planer';
  @ViewChild('userName') userName:ElementRef ;
  usernameStored = false;

  constructor() {
    if (localStorage.getItem('username')!=null) {
      this.usernameStored=true;
    }
  }

  submitName(){
    localStorage.setItem('username',this.userName.nativeElement.value);
    this.usernameStored=true;
  }
}
