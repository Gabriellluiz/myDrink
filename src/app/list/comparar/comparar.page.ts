import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Produtos } from 'src/app/interfaces/produtos';
import { Subscription } from 'rxjs';
import { ProdutosService } from 'src/app/servicos/produtos.service';


@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.page.html',
  styleUrls: ['./comparar.page.scss'],
})
export class CompararPage implements OnInit {
  private produto: Produtos= {};
  private produtoId: string = null;
  private productSubscription: Subscription;

  constructor(
    private menu: MenuController,
    private router: Router,
    private prodService: ProdutosService,
    private activatedRoute: ActivatedRoute
    ) { 
    this.produtoId = this.activatedRoute.snapshot.params['id'];
    if (this.produtoId) this.loadProduct(); 
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  loadProduct(){
    this.productSubscription = this.prodService.getProdut(this.produtoId).subscribe(data => {
      this.produto = data;
    });
  }



  /**
    * Metodo que leva para outra página a partir do nome do componentes da página passado por parametro
    * @param {string} pagina - Nome do componente lazy-loaded da página.
    */
   public irParaPagina(pagina: string) {
    this.router.navigateByUrl(pagina);
  }
}
