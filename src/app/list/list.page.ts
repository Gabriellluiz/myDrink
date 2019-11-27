import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';


import { Produtos } from '../interfaces/produtos';
import { Subscription } from '../../../node_modules/rxjs';
import { ProdutosService } from '../servicos/produtos.service';

import { BarService } from '../servicos/bar.service';
import { Bar } from '../interfaces/bar';
import { Platform, NavController } from '@ionic/angular';
import { UsuarioService } from '../servicos/usuario.service';
import * as firebase from 'firebase';



@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  subscrible: any;
  public produtos = new Array<Produtos>();
  private productsSubscription: Subscription;

  public bares = new Array<Bar>();
  private barSubscription: Subscription;

  public user = firebase.auth().currentUser;
  public adm;

  constructor(private router: Router,
    private produtosService: ProdutosService,
    private barService: BarService,
    public platform: Platform,
    private userService: UsuarioService,
    private navCtrl: NavController

  ) {

    this.barSubscription = this.barService.getBares().subscribe(data => {
      this.bares = data;
    })
    this.productsSubscription = this.produtosService.getProduts().subscribe(data => {
      this.produtos = data;
    })

    /*this.subscrible = this.platform.backButton.subscribeWithPriority(999999, () => {
      if (window.location.pathname == "/list") {
        this.navCtrl.navigateBack('/home');
      }
    });*/
    
  
    if (this.user != null) {
      this.user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }

  }

  ionViewWillEnter(){
    if(this.user.email == 'adm@mydrink.com'){
      this.adm = this.user.email
    }
  }
  

  async deleteProdut(id: string) {
    try {
      await this.produtosService.deleteProdut(id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBar(id: string) {
    try {
      await this.barService.deleteBar(id);
    } catch (error) {
      console.log(error);
    }
  }

  
  ngOnInit() {

  }


  doSomething(event){
    setTimeout(()=>{
        event.target.complete();
        this.barSubscription.unsubscribe();
    }, 2000);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.barSubscription.unsubscribe();
  }
}
