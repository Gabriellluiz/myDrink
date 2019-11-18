import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MenuController, LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment
} from '@ionic-native/google-maps';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bar } from '../interfaces/bar';
import { BarService } from '../servicos/bar.service';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  subscrible: any;
  map: any;

  private loading: any;
  public lat = -22.494725;
  public long = -48.561356;

  public bares = new Array<Bar>();
  private barSubscription: Subscription;

  constructor(
    public router: Router,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public platform: Platform,
    private barService: BarService) {

    this.buscaBar();

    this.subscrible = this.platform.backButton.subscribeWithPriority(1, () => {
      if (window.location.pathname == "/home") {
        if (window.confirm("Deseja sair?")) {
          navigator["app"].exitApp();
        }
      }
    });
  }

  public async buscaBar() {
    await this.presentLoading();

    this.barSubscription = this.barService.getBares().subscribe(data => {
      this.bares = data;
      this.montarMapa();
      this.loading.dismiss();

    });
  }

  public montarMapa() {
    this.geolocation.getCurrentPosition().then((resp) => {

      const styles = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ];

      const position = new google.maps.LatLng(this.lat, this.long);

      const mapOptions = {
        zoom: 15,
        center: position,
        styles
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var infowd = new google.maps.InfoWindow({
        maxWidth: 500
      });

      var marker, i;

      for (i = 0; i < this.bares.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.bares[i].lat, this.bares[i].long),
          map: this.map,
          animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', mostraMarcador(marker, i, this.bares, infowd, this.router));
      }

      //Fechar os pop-up
      google.maps.event.addListener(this.map, 'click', function () {
        infowd.close();
      });

      this.loading.dismiss();

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    function mostraMarcador(marker, i, bares, infowd, router) {
      infowd.close();
      return function () {
        infowd.open(this.map, marker);
        infowd.setContent('<div color="fundo">' +
          '<h4 class="tituloPopUp">' + bares[i].nomeBar + '</h4>' +
          '<div>' +
          '<ion-item>' +
          '<ion-icon name="pin" slot="start"></ion-icon>' +
          '<ion-label>' +
          'Nº.' + bares[i].numero + ' - ' + bares[i].bairro +
          '</ion-label>' +
          '</ion-item>' +

          '<ion-item>' +
          '<ion-icon name="call" slot="start"></ion-icon>' +
          '<ion-label>' + bares[i].telefone + '</ion-label>' +
          '</ion-item>' +

          '<ion-item>' +
          '<ion-icon name="time" slot="start"></ion-icon>' +
          '<ion-label>' + bares[i].horario + '</ion-label>' +
          '</ion-item>' +

          '<ion-button id="btn' + i + '" color="laranja" expand="block" fill="outline">Abrir</ion-button>' +
          '</div>' +
          '</div>');

        new google.maps.event.addListener(infowd, 'domready', () => {
          let clickableItem = document.getElementById('btn' + i);
          if (clickableItem) {
            clickableItem.addEventListener('click', () => {
              console.log('btn' + i);
              router.navigate(['/tela-bar', bares[i].id])
            })
          }
        });
      }
    }
  }


  ngOnInit() { }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  ngAfterContentInit() { }

  ionViewWillEnter() { this.menuCtrl.enable(true); }

}

