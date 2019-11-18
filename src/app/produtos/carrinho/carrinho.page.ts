import { Component, OnInit } from '@angular/core';
import { DadosBarService } from 'src/app/servicos/dados.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  public carrinho = [];

  constructor(public ds: DadosBarService,
    public rota: Router,
    private toastCtrl: ToastController
    ) { 
      let message = 'Calculadora vazia...';
      if (this.carrinho == null){       
     }else{
        this.presentToast(message);
      };
    }

  ionViewDidEnter() {
    this.carrinho = this.ds.getDados('pedidos');
    console.log(this.carrinho);
  }

  ngOnInit() {}

  public limpar(){
    this.carrinho = [];
  }

 public removeItem(item) {
   const posicao: number = this.carrinho.indexOf(item);
   if(posicao !== -1){
     this.carrinho.splice(posicao, 1);
   }
 }

  public totalProduto() {
    let total = 0;
    for (let prod of this.carrinho) {
      total += prod.quantidade * prod.valor;
    }
    return total;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  
}
