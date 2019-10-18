import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

    const firebaseConfig = {
      apiKey: 'AIzaSyCPY6oxWvHHtSg54uM70SbkUqABC_IPf2A',
      authDomain: 'bookslistlibrary-59027.firebaseapp.com',
      databaseURL: 'https://bookslistlibrary-59027.firebaseio.com',
      projectId: 'bookslistlibrary-59027',
      storageBucket: 'bookslistlibrary-59027.appspot.com',
      messagingSenderId: '512436408604',
      appId: '1:512436408604:web:067a7038ce40f6084b6ad9',
      measurementId: 'G-KLX4QTSNJG'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
