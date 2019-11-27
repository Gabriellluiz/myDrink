import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { DadosBarService } from '../servicos/dados.service';
import { Router } from '../../../node_modules/@angular/router';
import { User } from '../interfaces/user';
import { AuthService } from '../servicos/auth.service';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public dadosGG: any;
  subscrible: any;
  public providerFb: firebase.auth.FacebookAuthProvider;
  activeMenu: string;
  public menu: MenuController;
  private loading: any;
  public userLogin: User = {};
  public dadosFB: any;

  constructor(
    public dados: DadosBarService,
    public afa: AngularFireAuth,
    private fb: Facebook,
    public platform: Platform,
    public menuCtrl: MenuController,
    private ds: DadosBarService,
    private rota: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService) {
    this.providerFb = new firebase.auth.FacebookAuthProvider();

    this.subscrible = this.platform.backButton.subscribeWithPriority(1, () => {
      if (window.location.pathname == "/login") {
        if (window.confirm("Deseja sair do aplicativo?")) {
          navigator["app"].exitApp();
        }
      }
    });
  }

  ngOnInit() { }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      let message: string;

      switch (error.code) {
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

        case 'auth/network-request-failed':
          message = 'Sem conexão com a internet';
          break;
      }

      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }

  }

  async resetSenha() {
    //let message = 'Verifique sua caixa de email..'
    await this.presentLoading();
    try {
      this.authService.resetSenha(this.userLogin);
      //this.presentToast(message);
    } catch (error) {
      let message: string;
      switch (error.code) {

        case 'auth/user-not-found':
          message = 'Usuário não encontrado!';
          break;

        case 'auth/invalid-email':
          message = 'Email invalido!';
          break;
      }

      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  };


  facebookLogin() {
    if (this.platform.is('cordova')) {
      console.log('Plataforma Cordova');
      this.facebookCordova();
    } else {
      console.log('Plataforma Web');
      this.loginFacebook();
    }
  }

  async loginFacebook() {
    this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((success) => {
        console.log('Info Facebook: ' + JSON.stringify(success));
        this.dadosFB = success["user"];
        this.dados.setDados('dados', this.dadosFB);
      })
      .catch((error) => {
        console.log('Erro: ' + JSON.stringify(error));
      });
  }

  async facebookCordova() {
    this.fb.login(['email']).then((response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          console.log('Info Facebook: ' + JSON.stringify(success));
          this.dadosFB = success["user"];
        })
        .catch((error) => { console.log('Erro: ' + JSON.stringify(error)); });
    }).catch((error) => { console.log(error); });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  ngAfterContentInit() { }

  ionViewWillEnter() { this.menuCtrl.enable(false); }


}
