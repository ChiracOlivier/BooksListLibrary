import { Injectable } from '@angular/core';
import {Book} from '../models/Book.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {error} from 'util';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
   books: Book[] = [];
   bookSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.bookSubject.next(this.books);
  }
  saveBooks(){
    firebase.database().ref('books').set(this.books);
  }
  getBooks(){
    firebase.database().ref('books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
  }
  getSingleBook(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
            // tslint:disable-next-line:no-shadowed-variable
          }, (error) => {
            reject(error);
          }
        );

      }
    );
  }
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  deleteSingleBook(book: Book){
      if (book.photo) {
        const storageRef = firebase.storage().refFromURL(book.photo);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
          },
          // tslint:disable-next-line:no-shadowed-variable
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
      }
      const bookIndexToDelete = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
      this.books.splice(bookIndexToDelete, 1);
      this.saveBooks();
      this.emitBooks();
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          // tslint:disable-next-line:no-shadowed-variable
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
