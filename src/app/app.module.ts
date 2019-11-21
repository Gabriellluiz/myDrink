import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DadosBarService } from './servicos/dados.service';

import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
    
  ],
  providers: [
    Facebook,
    StatusBar,
    Chooser,
    SplashScreen,
    Geolocation,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DadosBarService,
    SocialSharing,
    Camera,
    File
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  public dados: any;

  constructor(
    public dadosFB: DadosBarService
  ){}

  public push(){
    this.dadosFB.getDados('dadosFB')
    
  }
}
