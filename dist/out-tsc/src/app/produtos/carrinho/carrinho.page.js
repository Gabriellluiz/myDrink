import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DadosBarService } from 'src/app/servicos/dados-bar.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
var CarrinhoPage = /** @class */ (function () {
    function CarrinhoPage(ds, rota, alertController) {
        this.ds = ds;
        this.rota = rota;
        this.alertController = alertController;
        this.carrinho = [];
    }
    CarrinhoPage.prototype.ionViewDidEnter = function () {
        this.carrinho = this.ds.getDados('carrinho');
    };
    CarrinhoPage.prototype.ngOnInit = function () {
    };
    CarrinhoPage.prototype.totalProduto = function () {
        var total = 0;
        for (var _i = 0, _a = this.carrinho; _i < _a.length; _i++) {
            var prod = _a[_i];
            total += prod.quantidade * prod.valor;
        }
        return total;
    };
    CarrinhoPage.prototype.finalizarCompra = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Finalizar Compra!',
                            message: 'Deseja realmente <strong>Finalizar a sua compra</strong>?',
                            buttons: [
                                {
                                    text: 'NÃO',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: compra');
                                    }
                                }, {
                                    text: 'Sim',
                                    handler: function () {
                                        var listaCompras = [];
                                        listaCompras = _this.ds.getDados('listaCompras');
                                        if (listaCompras) {
                                            listaCompras.push(_this.totalProduto());
                                        }
                                        else {
                                            listaCompras = [];
                                            listaCompras.push(_this.totalProduto());
                                        }
                                        _this.ds.setDados('listaCompras', listaCompras);
                                        _this.ds.removeDados(false, 'carrinho');
                                        _this.rota.navigateByUrl("/list");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CarrinhoPage = tslib_1.__decorate([
        Component({
            selector: 'app-carrinho',
            templateUrl: './carrinho.page.html',
            styleUrls: ['./carrinho.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [DadosBarService,
            Router,
            AlertController])
    ], CarrinhoPage);
    return CarrinhoPage;
}());
export { CarrinhoPage };
//# sourceMappingURL=carrinho.page.js.map