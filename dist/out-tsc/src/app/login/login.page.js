import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { DadosBarService } from '../servicos/dados-bar.service';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../servicos/auth.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(menuCtrl, ds, rota, loadingCtrl, toastCtrl, authService) {
        this.menuCtrl = menuCtrl;
        this.ds = ds;
        this.rota = rota;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.userLogin = {};
    }
    LoginPage.prototype.ngOnInit = function () { };
    LoginPage.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1, message;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.authService.login(this.userLogin)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        message = void 0;
                        switch (error_1.code) {
                            case 'auth/email-already-in-use':
                                message = 'E-mail sendo usado!';
                                break;
                            case 'auth/argument-error':
                                message = 'E-mail e senha invalidos!';
                                break;
                            case 'auth/invalid-email':
                                message = 'E-mail invalido!';
                                break;
                            case 'auth/user-not-found':
                                message = 'E-mail não cadastrado!';
                                break;
                            case 'auth/wrong-password':
                                message = 'Senha incorreta!';
                                break;
                        }
                        this.presentToast(message);
                        return [3 /*break*/, 6];
                    case 5:
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.presentLoading = function () {
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
    LoginPage.prototype.presentToast = function (message) {
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
    LoginPage.prototype.ngAfterContentInit = function () { };
    LoginPage.prototype.ionViewWillEnter = function () { this.menuCtrl.enable(false); };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [MenuController,
            DadosBarService,
            Router,
            LoadingController,
            ToastController,
            AuthService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map