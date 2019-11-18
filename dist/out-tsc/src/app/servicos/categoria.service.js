import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
var CategoriaService = /** @class */ (function () {
    function CategoriaService(afs) {
        this.afs = afs;
        this.listaCategoria = this.afs.collection('Categorias', function (ref) { return ref.orderBy('nomeCat'); });
    }
    CategoriaService.prototype.getCategorias = function () {
        return this.listaCategoria.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return tslib_1.__assign({ id: id }, data);
            });
        }));
    };
    CategoriaService.prototype.addCategoria = function (cat) {
        return this.listaCategoria.add(cat);
    };
    CategoriaService.prototype.getCategoria = function (id) {
        return this.listaCategoria.doc(id).valueChanges();
    };
    CategoriaService.prototype.updateCategoria = function (id, cat) {
        return this.listaCategoria.doc(id).update(cat);
    };
    CategoriaService.prototype.deleteCategoria = function (id) {
        return this.listaCategoria.doc(id).delete();
    };
    CategoriaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], CategoriaService);
    return CategoriaService;
}());
export { CategoriaService };
//# sourceMappingURL=categoria.service.js.map