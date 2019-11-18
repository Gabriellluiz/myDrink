import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { ProdutosService } from '../servicos/produtos.service';
import { BarService } from '../servicos/bar.service';
var ListPage = /** @class */ (function () {
    function ListPage(rota, produtosService, barService) {
        var _this = this;
        this.rota = rota;
        this.produtosService = produtosService;
        this.barService = barService;
        this.produtos = new Array();
        this.bares = new Array();
        this.barSubscription = this.barService.getBares().subscribe(function (data) {
            _this.bares = data;
        });
        this.productsSubscription = this.produtosService.getProduts().subscribe(function (data) {
            _this.produtos = data;
        });
    }
    ListPage.prototype.deleteProdut = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.produtosService.deleteProdut(id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ListPage.prototype.deleteBar = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.barService.deleteBar(id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ListPage.prototype.ngOnInit = function () {
    };
    ListPage.prototype.ngOnDestroy = function () {
        this.productsSubscription.unsubscribe();
        this.barSubscription.unsubscribe();
    };
    ListPage = tslib_1.__decorate([
        Component({
            selector: 'app-list',
            templateUrl: 'list.page.html',
            styleUrls: ['list.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ProdutosService,
            BarService])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.page.js.map