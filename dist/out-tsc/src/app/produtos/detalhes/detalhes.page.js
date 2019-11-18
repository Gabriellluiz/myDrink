import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController, ToastController, NavController } from '../../../../node_modules/@ionic/angular';
import { AuthService } from '../../servicos/auth.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ProdutosService } from '../../servicos/produtos.service';
import { BarService } from 'src/app/servicos/bar.service';
import { CategoriaService } from 'src/app/servicos/categoria.service';
import { SubcategoriaService } from 'src/app/servicos/subcategoria.service';
var DetalhesPage = /** @class */ (function () {
    function DetalhesPage(loadingCtrl, toastCtrl, authService, activatedRoute, prodService, barService, catService, subCatService, navCtrl, router) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.prodService = prodService;
        this.barService = barService;
        this.catService = catService;
        this.subCatService = subCatService;
        this.navCtrl = navCtrl;
        this.router = router;
        this.produto = {};
        this.produtoId = null;
        this.bar = {};
        this.bares = new Array();
        this.barId = null;
        this.cat = {};
        this.cats = new Array();
        this.catId = null;
        this.sub = {};
        this.subs = new Array();
        this.subId = null;
        this.segmento = 'produtos';
        this.barId = this.activatedRoute.snapshot.params['idBar'];
        if (this.barId)
            this.loadBar();
        this.produtoId = this.activatedRoute.snapshot.params['id'];
        if (this.produtoId)
            this.loadProduct();
        this.catSubscription = this.catService.getCategorias().subscribe(function (data) {
            _this.cats = data;
        });
        this.subSubscription = this.subCatService.getSubs().subscribe(function (data) {
            _this.subs = data;
        });
        this.barSubscription = this.barService.getBares().subscribe(function (data) {
            _this.bares = data;
        });
    }
    DetalhesPage.prototype.ngOnInit = function () {
    };
    DetalhesPage.prototype.ngOnDestroy = function () {
        if (this.productSubscription)
            this.productSubscription.unsubscribe();
        if (this.barSubscription)
            this.barSubscription.unsubscribe();
    };
    DetalhesPage.prototype.loadProduct = function () {
        var _this = this;
        this.productSubscription = this.prodService.getProdut(this.produtoId).subscribe(function (data) {
            _this.produto = data;
        });
    };
    DetalhesPage.prototype.loadCat = function () {
        var _this = this;
        this.subSubscription = this.catService.getCategoria(this.catId).subscribe(function (data) {
            _this.cat = data;
        });
    };
    DetalhesPage.prototype.loadSubCat = function () {
        var _this = this;
        this.catSubscription = this.subCatService.getSub(this.subId).subscribe(function (data) {
            _this.sub = data;
        });
    };
    DetalhesPage.prototype.loadBar = function () {
        var _this = this;
        this.barSubscription = this.barService.getBar(this.barId).subscribe(function (data) {
            _this.bar = data;
        });
    };
    DetalhesPage.prototype.salvarProd = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.produto.userId = this.authService.getAuth().currentUser.uid;
                        if (!this.produtoId) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.prodService.updateProdut(this.produtoId, this.produto)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 4:
                        _a.sent();
                        this.navCtrl.navigateBack('/list');
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.presentToast('Erro ao tentar salvar');
                        this.loading.dismiss();
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 12];
                    case 7:
                        this.produto.createdAt = new Date().getTime();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, this.prodService.addProdut(this.produto)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 10:
                        _a.sent();
                        this.navCtrl.navigateBack('/list');
                        return [3 /*break*/, 12];
                    case 11:
                        error_2 = _a.sent();
                        this.presentToast('Erro ao tentar salvar');
                        this.loading.dismiss();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    DetalhesPage.prototype.salvarCat = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_3, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.cat.userId = this.authService.getAuth().currentUser.uid;
                        if (!this.catId) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.catService.updateCategoria(this.catId, this.cat)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 4:
                        _a.sent();
                        this.navCtrl.navigateBack('/list');
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        this.presentToast('Erro ao tentar salvar');
                        this.loading.dismiss();
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 12];
                    case 7:
                        this.cat.createdAt = new Date().getTime();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, this.catService.addCategoria(this.cat)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 10:
                        _a.sent();
                        this.navCtrl.navigateBack('/list');
                        return [3 /*break*/, 12];
                    case 11:
                        error_4 = _a.sent();
                        this.presentToast('Erro ao tentar salvar');
                        this.loading.dismiss();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    DetalhesPage.prototype.salvarSubCat = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_5, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.sub.userId = this.authService.getAuth().currentUser.uid;
                        if (!this.subId) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.subCatService.updateSub(this.subId, this.sub)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 4:
                        _a.sent();
                        this.navCtrl.navigateBack('/list');
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        this.presentToast('Erro ao tentar salvar');
                        this.loading.dismiss();
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 12];
                    case 7:
                        this.sub.createdAt = new Date().getTime();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, this.subCatService.addSub(this.sub)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 10:
                        _a.sent();
                        this.navCtrl.navigateBack('/list');
                        return [3 /*break*/, 12];
                    case 11:
                        error_6 = _a.sent();
                        this.presentToast('Erro ao tentar salvar');
                        this.loading.dismiss();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    DetalhesPage.prototype.salvarBar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_7, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.bar.userId = this.authService.getAuth().currentUser.uid;
                        if (!this.barId) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.barService.updateBar(this.barId, this.bar)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 4:
                        _a.sent();
                        this.navCtrl.navigateBack('/list');
                        return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        this.presentToast('Erro ao tentar salvar');
                        this.loading.dismiss();
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 12];
                    case 7:
                        this.bar.createdAt = new Date().getTime();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, this.barService.addBar(this.bar)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 10:
                        _a.sent();
                        this.navCtrl.navigateBack('/list');
                        return [3 /*break*/, 12];
                    case 11:
                        error_8 = _a.sent();
                        this.presentToast('Erro ao tentar salvar');
                        this.loading.dismiss();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    DetalhesPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({ message: 'Por favor, aguarde...' })];
                    case 1:
                        _a.loading = _b.sent();
                        return [2 /*return*/, this.loading.present()];
                }
            });
        });
    };
    DetalhesPage.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({ message: message, duration: 2000 })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
      * Metodo que leva para outra página a partir do nome do componentes da página passado por parametro
      * @param {string} pagina - Nome do componente lazy-loaded da página.
      */
    DetalhesPage.prototype.irParaPagina = function (pagina) {
        this.router.navigateByUrl(pagina);
    };
    DetalhesPage = tslib_1.__decorate([
        Component({
            selector: 'app-detalhes',
            templateUrl: './detalhes.page.html',
            styleUrls: ['./detalhes.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [LoadingController,
            ToastController,
            AuthService,
            ActivatedRoute,
            ProdutosService,
            BarService,
            CategoriaService,
            SubcategoriaService,
            NavController,
            Router])
    ], DetalhesPage);
    return DetalhesPage;
}());
export { DetalhesPage };
//# sourceMappingURL=detalhes.page.js.map