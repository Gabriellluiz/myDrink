import { Component, OnInit } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './servicos/auth.service';
import { DadosBarService } from './servicos/dados.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { UsuarioService } from './servicos/usuario.service';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public dadosFB: any;
  private loading: any;
  private usersSubscription: Subscription;
  public user = firebase.auth().currentUser; 
  public users = new Array<User>();
  public usuario;

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Lista de Bares',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Perfil',
      url: '/list',
      icon: 'person'
    }
    
  ];

  constructor(
    public dados: DadosBarService,
    public socialShare: SocialSharing,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private userService: UsuarioService
  ) {
    this.initializeApp();


    if (this.user != null) {
      this.user.providerData.forEach(function (user) {
        console.log("Sign-in provider: " + user.providerId);
        console.log("  Provider-specific UID: " + user.uid);
        console.log("  Name: " + user.displayName);
        console.log("  Email: " + user.email);
        console.log("  Photo URL: " + user.photoURL);
      });
    }

    this.usersSubscription = this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users)
    });

   
  }

  async pushDados(){
    this.dados.getDados("user").subscrible(data => {
      console.log(data);
        this.dadosFB = data;
    })
  }

  shareApp(){
    var appUrl = "https://play.google.com/store/apps/details?id=com.gabrielluiz.mydrink";
    this.socialShare.share("Baixe o app Mydrink, e se divirta!","","",appUrl).then(()=> {
    })
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  public infoUser(){
    for (let u of this.users) {
      console.log(u);
      if (this.user.email == u.usuario) {
        this.usuario = u;
      }
    }
  }

  ngOnInit(){
    this.infoUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent(); //styleDefault
      this.splashScreen.hide();
    });
  }
}
