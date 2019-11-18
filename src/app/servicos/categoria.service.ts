import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private listaCategoria: AngularFirestoreCollection<Categoria>;

  constructor(private afs: AngularFirestore) { 
    this.listaCategoria = this.afs.collection<Categoria>('Categorias',  ref => ref.orderBy('nomeCat'));
  }


  getCategorias() {
    return this.listaCategoria.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addCategoria(cat: Categoria) {
    return this.listaCategoria.add(cat);    
  }

  getCategoria(id: string) {
    return this.listaCategoria.doc<Categoria>(id).valueChanges();
  }

  updateCategoria(id: string, cat: Categoria) {
    return this.listaCategoria.doc<Categoria>(id).update(cat);
  }

  deleteCategoria(id: string) {
    return this.listaCategoria.doc(id).delete();
  }
}
