import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
var ProdutosService = /** @class */ (function () {
    function ProdutosService(afs) {
        this.afs = afs;
        this.listaProdutos = this.afs.collection('Produtos', function (ref) { return ref.orderBy('nome'); });
        this.listaProdutos = this.afs.collection('Produtos', function (ref) { return ref.where('subCategoria', '==', 'Cerveja'); });
    }
    ProdutosService.prototype.getProduts = function () {
        return this.listaProdutos.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return tslib_1.__assign({ id: id }, data);
            });
        }));
    };
    ProdutosService.prototype.addProdut = function (produto) {
        return this.listaProdutos.add(produto);
    };
    ProdutosService.prototype.getProdut = function (id) {
        return this.listaProdutos.doc(id).valueChanges();
    };
    ProdutosService.prototype.updateProdut = function (id, produto) {
        return this.listaProdutos.doc(id).update(produto);
    };
    ProdutosService.prototype.deleteProdut = function (id) {
        return this.listaProdutos.doc(id).delete();
    };
    ProdutosService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], ProdutosService);
    return ProdutosService;
}());
export { ProdutosService };
//# sourceMappingURL=produtos.service.js.map