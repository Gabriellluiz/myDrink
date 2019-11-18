import { Injectable } from '@angular/core';
import { Subcategoria } from '../interfaces/subcategoria';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  private listaSubCat: AngularFirestoreCollection<Subcategoria>;

  constructor(private afs: AngularFirestore) { 
    this.listaSubCat = this.afs.collection<Subcategoria>('Subcategorias',  ref => ref.orderBy('subCategoria'));
  }


  getSubs() {
    return this.listaSubCat.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addSub(sub: Subcategoria) {
    return this.listaSubCat.add(sub);    
  }

  getSub(id: string) {
    return this.listaSubCat.doc<Subcategoria>(id).valueChanges();
  }

  updateSub(id: string, sub: Subcategoria) {
    return this.listaSubCat.doc<Subcategoria>(id).update(sub);
  }

  deleteSub(id: string) {
    return this.listaSubCat.doc(id).delete();
  }
}
