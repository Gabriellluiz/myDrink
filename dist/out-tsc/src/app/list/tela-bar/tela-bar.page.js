import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BarService } from 'src/app/servicos/bar.service';
import { CategoriaService } from 'src/app/servicos/categoria.service';
import { SubcategoriaService } from 'src/app/servicos/subcategoria.service';
import { ProdutosService } from 'src/app/servicos/produtos.service';
import { DadosBarService } from 'src/app/servicos/dados-bar.service';
import { ToastController } from '@ionic/angular';
var TelaBarPage = /** @class */ (function () {
    function TelaBarPage(router, rota, barService, route, catService, subCatService, prodService, ds, toastController) {
        var _this = this;
        this.router = router;
        this.rota = rota;
        this.barService = barService;
        this.route = route;
        this.catService = catService;
        this.subCatService = subCatService;
        this.prodService = prodService;
        this.ds = ds;
        this.toastController = toastController;
        this.carrinho = [];
        this.bar = {};
        this.bares = new Array();
        this.prods = new Array();
        this.produtos = {};
        this.categorias = new Array();
        this.subcats = new Array();
        this.segmentoTipo = 'Cerveja';
        this.segmento = 'Bebidas';
        this.route.params.subscribe(function (parametros) {
            if (parametros['idBar']) {
                var id = parametros['idBar'];
                _this.barSubscription = _this.barService.getBar(id).subscribe(function (data) {
                    _this.bar = data;
                });
            }
        });
        this.catSubscription = this.catService.getCategorias().subscribe(function (data) {
            _this.categorias = data;
        });
        this.subSubscription = this.subCatService.getSubs().subscribe(function (data) {
            _this.subcats = data;
        });
        this.prodsSubscription = this.prodService.getProduts().subscribe(function (data) {
            _this.prods = data;
        });
    }
    TelaBarPage.prototype.ngOnInit = function () {
    };
    TelaBarPage.prototype.addCarrinhoToast = function (produto) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var index, toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.carrinho.indexOf(produto);
                        if (index > -1) {
                            this.carrinho[index].quantidade += 1;
                        }
                        else {
                            produto.quantidade = 1;
                            this.carrinho.push(produto);
                        }
                        this.ds.setDados('carrinho', this.carrinho);
                        return [4 /*yield*/, this.toastController.create({
                                message: produto.nome + ' adicionado ao Carrinho!',
                                duration: 2000
                            })];
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
    TelaBarPage.prototype.irParaPagina = function (pagina) {
        this.router.navigateByUrl(pagina);
    };
    TelaBarPage = tslib_1.__decorate([
        Component({
            selector: 'app-tela-bar',
            templateUrl: './tela-bar.page.html',
            styleUrls: ['./tela-bar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ActivatedRoute,
            BarService,
            ActivatedRoute,
            CategoriaService,
            SubcategoriaService,
            ProdutosService,
            DadosBarService,
            ToastController])
    ], TelaBarPage);
    return TelaBarPage;
}());
export { TelaBarPage };
//# sourceMappingURL=tela-bar.page.js.map