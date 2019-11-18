import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private listaUsers: AngularFirestoreCollection<User>; 

  constructor( private afs: AngularFirestore) {
    this.listaUsers = this.afs.collection<User>('Usuarios',  ref => ref.orderBy('nome'));
   }

  getUsers() {
    return this.listaUsers.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addUser(produto: User) {
    return this.listaUsers.add(produto);
  }

  getUser(id: string) {
    return this.listaUsers.doc<User>(id).valueChanges();
  }

  updateUser(id: string, produto: User) {
    return this.listaUsers.doc<User>(id).update(produto);
  }

  deleteUser(id: string) {
    return this.listaUsers.doc(id).delete();
  }
}
