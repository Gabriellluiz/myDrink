import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
var BarService = /** @class */ (function () {
    function BarService(afs) {
        this.afs = afs;
        this.listaBar = this.afs.collection('Bares', function (ref) { return ref.orderBy('nomeBar'); });
    }
    BarService.prototype.getBares = function () {
        return this.listaBar.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return tslib_1.__assign({ id: id }, data);
            });
        }));
    };
    BarService.prototype.addBar = function (bar) {
        return this.listaBar.add(bar);
    };
    BarService.prototype.getBar = function (id) {
        return this.listaBar.doc(id).valueChanges();
    };
    BarService.prototype.updateBar = function (id, bar) {
        return this.listaBar.doc(id).update(bar);
    };
    BarService.prototype.deleteBar = function (id) {
        return this.listaBar.doc(id).delete();
    };
    BarService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], BarService);
    return BarService;
}());
export { BarService };
//# sourceMappingURL=bar.service.js.map