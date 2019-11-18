import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Produtos } from '../interfaces/produtos';
import { map } from 'rxjs/operators';
import { Bar } from '../interfaces/bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BarService } from './bar.service';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private listaProdutos: AngularFirestoreCollection<Produtos>; 

  constructor(
    private afs: AngularFirestore    
    ) {
      this.listaProdutos = this.afs.collection<Produtos>('Produtos',  ref => ref.orderBy('nome'));
  }

  getProduts() {
    return this.listaProdutos.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addProdut(produto: Produtos) {
    return this.listaProdutos.add(produto);
  }

  getProdut(id: string) {
    return this.listaProdutos.doc<Produtos>(id).valueChanges();
  }

  updateProdut(id: string, produto: Produtos) {
    return this.listaProdutos.doc<Produtos>(id).update(produto);
  }

  deleteProdut(id: string) {
    return this.listaProdutos.doc(id).delete();
  }
}
