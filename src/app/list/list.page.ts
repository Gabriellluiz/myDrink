import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';


import { Produtos } from '../interfaces/produtos';
import { Subscription } from '../../../node_modules/rxjs';
import { ProdutosService } from '../servicos/produtos.service';

import { BarService } from '../servicos/bar.service';
import { Bar } from '../interfaces/bar';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public produtos = new Array<Produtos>();
  private productsSubscription: Subscription;

  public bares = new Array<Bar>();
  private barSubscription: Subscription;


  constructor(private rota: Router,
    private produtosService: ProdutosService,
    private barService: BarService
  ) {

    this.barSubscription = this.barService.getBares().subscribe(data => {
      this.bares = data;
    })
    this.productsSubscription = this.produtosService.getProduts().subscribe(data => {
      this.produtos = data;
    })


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
