import { Component, OnInit  } from '@angular/core';
import { Produtos } from '../../interfaces/produtos';
import { LoadingController, ToastController, NavController, IonSlides } from '../../../../node_modules/@ionic/angular';
import { AuthService } from '../../servicos/auth.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';
import { ProdutosService } from '../../servicos/produtos.service';
import { BarService } from 'src/app/servicos/bar.service';
import { Bar } from 'src/app/interfaces/bar';
import { CategoriaService } from 'src/app/servicos/categoria.service';
import { SubcategoriaService } from 'src/app/servicos/subcategoria.service';
import { Categoria } from 'src/app/interfaces/categoria';
import { Subcategoria } from 'src/app/interfaces/subcategoria';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  public fileObj: ChooserResult;
  public porcentUp: Observable<number>;
  public downloadUrl: Observable<string>;
  private loading: any;
  
  private produto: Produtos= {};
  private produtoId: string = null;
  private productSubscription: Subscription;

  private bar: Bar={};
  private bares= new Array<Bar>();
  private barId: string = null;
  private barSubscription: Subscription;

  private cat: Categoria={};
  private cats= new Array<Categoria>();
  private catId: string = null;
  private catSubscription: Subscription;

  private sub: Subcategoria={};
  private subs= new Array<Subcategoria>();
  private subId: string = null;
  private subSubscription: Subscription;
  
  

  constructor(private loadingCtrl: LoadingController,
    private chooser: Chooser,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private prodService: ProdutosService,
    private barService: BarService,
    private catService: CategoriaService,
    private subCatService: SubcategoriaService,
    private navCtrl: NavController,
    public router: Router,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage
  ) { 

    this.barId = this.activatedRoute.snapshot.params['idBar'];
    if (this.barId) this.loadBar();

    this.produtoId = this.activatedRoute.snapshot.params['id'];
    if (this.produtoId) this.loadProduct();   

    this.catSubscription = this.catService.getCategorias().subscribe(data => {
      this.cats = data;
    });

    this.subSubscription = this.subCatService.getSubs().subscribe(data => {
      this.subs = data;
    });

    this.barSubscription = this.barService.getBares().subscribe(data => {
      this.bares = data;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    if (this.barSubscription) this.barSubscription.unsubscribe();
  }

  pickFile(){
    this.chooser.getFile("image/jpeg").then((value: ChooserResult) => {
      this.fileObj = value;
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }
  
  loadProduct(){
    this.productSubscription = this.prodService.getProdut(this.produtoId).subscribe(data => {
      this.produto = data;
    });
  }

  loadCat(){
    this.subSubscription = this.catService.getCategoria(this.catId).subscribe(data => {
      this.cat = data;
    });
  }

  loadSubCat(){
    this.catSubscription = this.subCatService.getSub(this.subId).subscribe(data => {
      this.sub = data;
    });
  }

  loadBar(){
    this.barSubscription = this.barService.getBar(this.barId).subscribe(data => {
      this.bar = data;
    });
  }

  async salvarProd(){
    await this.presentLoading();

    this.produto.userId = this.authService.getAuth().currentUser.uid;

    if (this.produtoId) {
      try {
        await this.prodService.updateProdut(this.produtoId, this.produto);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.produto.createdAt = new Date().getTime();

      try {
        await this.prodService.addProdut(this.produto);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async salvarCat(){
    await this.presentLoading();

    this.cat.userId = this.authService.getAuth().currentUser.uid;

    if (this.catId) {
      try {
        await this.catService.updateCategoria(this.catId, this.cat);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.cat.createdAt = new Date().getTime();

      try {
        await this.catService.addCategoria(this.cat);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }


  async salvarSubCat(){
    await this.presentLoading();

    this.sub.userId = this.authService.getAuth().currentUser.uid;

    if (this.subId) {
      try {
        await this.subCatService.updateSub(this.subId, this.sub);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.sub.createdAt = new Date().getTime();

      try {
        await this.subCatService.addSub(this.sub);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }


  async salvarBar(){
    await this.presentLoading();

    this.bar.userId = this.authService.getAuth().currentUser.uid;

    if (this.barId) {
      try {
        await this.barService.updateBar(this.barId, this.bar);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.bar.createdAt = new Date().getTime();

      try {
        await this.barService.addBar(this.bar);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async abrirGaleria(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try{
      const fileUrl: string = await this.camera.getPicture(options);

      let file: string;

      if(this.platform.is('ios')){
        file = fileUrl.split('/').pop();
      }else {
        file = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.indexOf('?'));
      }

      const path: string = fileUrl.substring(0, fileUrl.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob([buffer], {type: 'image/jpeg'});
      
      this.uploadFoto(blob);
    }catch(error) {
      console.log(error);
    }
  }


  uploadFoto(blob: Blob){
    const ref = this.afStorage.ref('Produtos/' + this.createFileName());
    const task = ref.put(blob);

    this.porcentUp = task.percentageChanges();
    task. snapshotChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  public segmento: string = 'produtos';
  /**
    * Metodo que leva para outra página a partir do nome do componentes da página passado por parametro
    * @param {string} pagina - Nome do componente lazy-loaded da página.
    */
  public irParaPagina(pagina: string) {
    this.router.navigateByUrl(pagina);
  }
}


