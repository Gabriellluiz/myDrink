import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Bar } from 'src/app/interfaces/bar';
import { BarService } from 'src/app/servicos/bar.service';

import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/servicos/categoria.service';

import { Subcategoria } from 'src/app/interfaces/subcategoria';
import { SubcategoriaService } from 'src/app/servicos/subcategoria.service';

import { Produtos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/servicos/produtos.service';
import { DadosBarService } from 'src/app/servicos/dados.service';
import { ToastController, Platform } from '@ionic/angular';



@Component({
  selector: 'app-tela-bar',
  templateUrl: './tela-bar.page.html',
  styleUrls: ['./tela-bar.page.scss'],
})
export class TelaBarPage implements OnInit {
  subscrible: any;
  public carrinho = [];
  public bar: Bar = {};
  public bares = new Array<Bar>();
  private barSubscription: Subscription;

  public prods = new Array<Produtos>();
  public produtos: Produtos = {};
  public prodsSubscription: Subscription;

  public categorias = new Array<Categoria>();
  private catSubscription: Subscription;

  public subcats = new Array<Subcategoria>();
  private subSubscription: Subscription;


  constructor(public router: Router,
    private rota: ActivatedRoute,
    private barService: BarService,
    private route: ActivatedRoute,
    private catService: CategoriaService,
    private subCatService: SubcategoriaService,
    private prodService: ProdutosService,
    private ds: DadosBarService,
    public platform: Platform,
    private toastCtrl: ToastController) {

    this.route.params.subscribe(parametros => {
      if (parametros['idBar']) {
        let id = parametros['idBar'];
        this.barSubscription = this.barService.getBar(id).subscribe(data => {
          this.bar = data;
        })
      }
    });

    this.catSubscription = this.catService.getCategorias().subscribe(data => {
      this.categorias = data;
    });

    this.subSubscription = this.subCatService.getSubs().subscribe(data => {
      this.subcats = data;
    });

    this.prodsSubscription = this.prodService.getProduts().subscribe(data => {
      this.prods = data;
    })

    this.subscrible = this.platform.backButton.subscribeWithPriority(999999, () => {
      if (window.location.pathname == "/tela-bar") {
        router.navigateByUrl('/list')
      }
    });
  }


  ngOnInit() {}


  public async addCarrinhoToast(produto: Produtos) {
    const index = this.carrinho.indexOf(produto);
    
    if (index > -1) {      
      this.carrinho[index].quantidade += 1;
    } else {
      produto.quantidade = 1;
      this.carrinho.push(produto);
    }
    
    this.ds.setDados('pedidos', this.carrinho);
    
    const toast = await this.toastCtrl.create({
      message: produto.nome + ' adicionado à calculadora!',
      duration: 2000
    });
    toast.present();
  }

  async deleteProdut(id: string) {
    try {
      await this.prodService.deleteProdut(id);
    } catch (error) {
      console.log(error);
    }
  }


  public segmentoTipo: string = 'Cerveja';
  public segmento: string = 'Bebidas';
  /**
    * Metodo que leva para outra página a partir do nome do componentes da página passado por parametro
    * @param {string} pagina - Nome do componente lazy-loaded da página.
    */
  public irParaPagina(pagina: string) {
    this.router.navigateByUrl(pagina);
  }
}
