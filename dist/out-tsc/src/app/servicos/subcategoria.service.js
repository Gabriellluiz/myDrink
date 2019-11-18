import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
var SubcategoriaService = /** @class */ (function () {
    function SubcategoriaService(afs) {
        this.afs = afs;
        this.listaSubCat = this.afs.collection('Subcategorias', function (ref) { return ref.orderBy('subCategoria'); });
    }
    SubcategoriaService.prototype.getSubs = function () {
        return this.listaSubCat.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return tslib_1.__assign({ id: id }, data);
            });
        }));
    };
    SubcategoriaService.prototype.addSub = function (sub) {
        return this.listaSubCat.add(sub);
    };
    SubcategoriaService.prototype.getSub = function (id) {
        return this.listaSubCat.doc(id).valueChanges();
    };
    SubcategoriaService.prototype.updateSub = function (id, sub) {
        return this.listaSubCat.doc(id).update(sub);
    };
    SubcategoriaService.prototype.deleteSub = function (id) {
        return this.listaSubCat.doc(id).delete();
    };
    SubcategoriaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], SubcategoriaService);
    return SubcategoriaService;
}());
export { SubcategoriaService };
//# sourceMappingURL=subcategoria.service.js.map