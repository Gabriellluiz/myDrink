import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { ComparaValidator } from '../../validador/compara-validator';
import * as moment from 'moment';
import { ToastController, LoadingController } from '../../../../node_modules/@ionic/angular';
import { AuthService } from '../../servicos/auth.service';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { AngularFirestore } from '../../../../node_modules/@angular/fire/firestore';
var CadastroPage = /** @class */ (function () {
    function CadastroPage(formBuilder, rota, loadingCtrl, toastCtrl, authService, afa, afs) {
        this.formBuilder = formBuilder;
        this.rota = rota;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.afa = afa;
        this.afs = afs;
        this.user = {};
        this.userRegister = {};
        this.mensagens_validacao = {
            nome: [
                { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
                { tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres.' },
            ],
            dataNascimento: [
                { tipo: 'required', mensagem: 'O campo Data de Nascimento é obrigatório.' },
                { tipo: 'pattern', mensagem: 'O formato deve ser: 00/00/0000.' }
            ],
            email: [
                { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
                { tipo: 'email', mensagem: 'E-mail Inválido.' }
            ],
            senha: [
                { tipo: 'required', mensagem: 'O campo Senha é obrigatório.' },
                { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
                { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caractéres.' }
            ],
            confirmaSenha: [
                { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
                { tipo: 'comparacao', mensagem: 'Confirmação invalida, senha incorreta.' }
            ]
        };
        this.formCadastro = formBuilder.group({
            // Declara os campos do formulário.
            nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            dataNascimento: ['', Validators.compose([Validators.required, Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])],
            confirmaSenha: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        }, {
            validator: ComparaValidator('senha', 'confirmaSenha')
        });
    }
    CadastroPage.prototype.ngOnInit = function () {
    };
    CadastroPage.prototype.exibirForm = function () {
        console.log(this.formCadastro);
        // Pega apenas a data de nascimento do Formulário.
        var dataNascimento = this.formCadastro.value.dataNascimento;
        // Converter a data em EN-US
        console.log('EN-US: ', moment(dataNascimento, "DD/MM/YYYY").format('YYYY-MM-DD'));
    };
    CadastroPage.prototype.register = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newUser, newUserObject, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.authService.register(this.userRegister)];
                    case 1:
                        newUser = _a.sent();
                        newUserObject = Object.assign({}, this.userRegister);
                        delete newUserObject.senha;
                        return [4 /*yield*/, this.afs.collection('Usuarios').doc(newUser.user.uid).set(this.userRegister)];
                    case 2:
                        _a.sent();
                        console.log(newUserObject);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /*public salvar() {
      //So ira salvar se o formulario inteiro for valido
      if (this.formCadastro.valid) {
        //Pega todos os dados do cadastro
        let cadastro = this.formCadastro.value;
        //Pega a lista de usuarios cadastrados
        let usuarios = this.ds.getDados('usuarios');
  
        if (usuarios) {
          //Cria uma posição no array com o cpf
          //Para facilitar a busca e adiciona o cadastro inteiro
          usuarios[cadastro.nomeUser] = cadastro;
  
        } else {
          usuarios = [];
          usuarios[cadastro.nomeUser] = cadastro;
        }
        this.ds.setDados('usuarios', usuarios);
        this.rota.navigate(['/login']);
      } else {
        alert('Existem dados inválidos!!!')
      }
    }*/
    CadastroPage.prototype.registrar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2, message;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.formCadastro.valid) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        /*const newUser =*/ return [4 /*yield*/, this.authService.register(this.userRegister)];
                    case 2:
                        /*const newUser =*/ _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _a.sent();
                        message = void 0;
                        switch (error_2.code) {
                            case 'auth/email-already-in-use':
                                message = 'E-mail sendo usado!';
                                break;
                            case 'auth/invalid-email':
                                message = 'E-mail invalido!';
                                break;
                            case 'auth/weak-password':
                                message = 'Mínimo 6 caracteres';
                                break;
                        }
                        this.presentToast(message);
                        return [3 /*break*/, 5];
                    case 4: return [7 /*endfinally*/];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.presentToast("Existem dados inválidos!");
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CadastroPage.prototype.presentLoading = function () {
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
    CadastroPage.prototype.presentToast = function (message) {
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
    CadastroPage = tslib_1.__decorate([
        Component({
            selector: 'app-cadastro',
            templateUrl: './cadastro.page.html',
            styleUrls: ['./cadastro.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Router,
            LoadingController,
            ToastController,
            AuthService,
            AngularFireAuth,
            AngularFirestore])
    ], CadastroPage);
    return CadastroPage;
}());
export { CadastroPage };
//# sourceMappingURL=cadastro.page.js.map