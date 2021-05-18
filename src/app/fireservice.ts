import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { libro } from './libro';

@Injectable()
export class FireService {
  /************
   * VARIABLES QUE REPRESENTAN LAS
   * COLECCIONES DE LA BD
   ************/
  private COLLECT_BOOKS: string = 'libros';

  /******
   * ATRIBUTOS
   *****/
  private booksCollection: AngularFirestoreCollection<libro>;

  constructor(private db: AngularFirestore) {
    //Inicializa el objeto booksCollection
    this.booksCollection = this.db.collection<libro>(this.COLLECT_BOOKS);
  }

  //Metodo para obtener todos los libros
  get() {
    this.booksCollection = this.db.collection<libro>(this.COLLECT_BOOKS);
    //Retorna el resultado
    return this.booksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  //Metodo para añadir un libro en la BD
  post(libro: libro) {
    return this.booksCollection.add(libro);
  }

  delete(id: string) {
    return this.booksCollection.doc(id).delete();
  }

  editar(id: string, libro: libro) {
    return this.booksCollection.doc(id).update(libro);
  }
}
