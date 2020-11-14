import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { environment } from 'src/environments/environment';

const config = {
  apiKey: "AIzaSyCOt5IzMAZNBU1ss_71DaTuhm7Q7fRhHDE",
  authDomain: "poker-planner-30c34.firebaseapp.com",
  databaseURL: "https://poker-planner-30c34.firebaseio.com",
  projectId: "poker-planner-30c34",
  storageBucket: "poker-planner-30c34.appspot.com",
  messagingSenderId: "1076363412536",
  appId: "1:1076363412536:web:f41a276eb3965adc4112cd"
};

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
