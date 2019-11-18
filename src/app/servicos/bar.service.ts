import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Bar } from '../interfaces/bar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  private listaBar: AngularFirestoreCollection<Bar>;

  constructor(private afs: AngularFirestore) {
    this.listaBar = this.afs.collection<Bar>('Bares', ref => ref.orderBy('nomeBar'));
  }

  getBares() {
    return this.listaBar.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addBar(bar: Bar) {
    return this.listaBar.add(bar);
  }

  getBar(id: string) {
    return this.listaBar.doc<Bar>(id).valueChanges();
  }

  updateBar(id: string, bar: Bar) {
    return this.listaBar.doc<Bar>(id).update(bar);
  }

  deleteBar(id: string) {
    return this.listaBar.doc(id).delete();
  }
}
