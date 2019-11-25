import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { ComparaValidator } from '../../validador/compara-validator'
import * as moment from 'moment';
import { User } from '../../interfaces/user';
import { ToastController, LoadingController } from '../../../../node_modules/@ionic/angular';
import { AuthService } from '../../servicos/auth.service';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { AngularFirestore } from '../../../../node_modules/@angular/fire/firestore';

import { Platform } from '@ionic/angular';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public fileObj: ChooserResult;
  public porcentUp: Observable<number>;
  public downloadUrlUser: Observable<string>;

  public user: any = {};
  public userRegister: User = {};
  private loading: any;
  public formCadastro: FormGroup;

  mensagens_validacao = {
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
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.' }      
    ],
    confirmaSenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'comparacao', mensagem: 'Confirmação invalida, senha incorreta.' }
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private rota: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,

    private chooser: Chooser,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage
  ) {
    this.formCadastro = formBuilder.group({
      // Declara os campos do formulário.
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      foto: [''],
      dataNascimento: ['', Validators.compose([Validators.required, Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmaSenha: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    }, {
        validator: ComparaValidator('senha', 'confirmaSenha')
      });
  }

  ngOnInit() {
  }

  async abrirGaleriaUser(){
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
      
      this.uploadFotoUser(blob);
    }catch(error) {
      alert(error);
    }
  }


  uploadFotoUser(blob: Blob){
    const ref = this.afStorage.ref('Usuarios/' + this.createFileName());
    const task = ref.put(blob);

    this.porcentUp = task.percentageChanges();
    task. snapshotChanges().pipe(
      finalize(() => this.downloadUrlUser = ref.getDownloadURL())
    ).subscribe();
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  

  public exibirForm() {
    console.log(this.formCadastro);

    // Pega apenas a data de nascimento do Formulário.
    let dataNascimento = this.formCadastro.value.dataNascimento;

    // Converter a data em EN-US
    console.log('EN-US: ', moment(dataNascimento, "DD/MM/YYYY").format('YYYY-MM-DD'));

  }


  async registrar() {

    if (this.formCadastro.valid) {

      try {
        const newUser = await this.authService.register(this.userRegister);
        const newUserObject = Object.assign({}, this.userRegister);

        delete newUserObject.senha;

        await this.afs.collection('Usuarios').doc(newUser.user.uid).set(newUserObject);
        
      } catch (error) {
        let message: string;

        switch (error.code) {
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
      } finally {
        this.loading.dismiss();
      }
    }
    else {
      this.presentToast("Existem dados inválidos!");
    }

    //await this.presentLoading();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


}









