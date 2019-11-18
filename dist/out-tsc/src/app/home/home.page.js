import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(geolocation, menuCtrl, navCtrl) {
        this.geolocation = geolocation;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.lat = -22.494725;
        this.long = -48.561356;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            var styles = [
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
            console.log("lat" + resp.coords.latitude + "- long" + resp.coords.longitude);
            var position = new google.maps.LatLng(_this.lat, _this.long);
            var mapOptions = {
                zoom: 16,
                center: position,
                styles: styles
            };
            _this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            //BarExemplo1//
            //pop-up
            var pop_up1 = '<div>' +
                '<h4>Bar Exemplo 1</h4>' +
                '<div>' +
                '<ion-item>' +
                '<ion-icon name="pin" slot="start"></ion-icon>' +
                '<ion-label>' +
                'R. Tiradentes, Nº. 340 - Centro' +
                '</ion-label>' +
                '</ion-item>' +
                '<ion-item>' +
                '<ion-icon name="call" slot="start"></ion-icon>' +
                '<ion-label>' +
                '(14) 99999-9999' +
                '</ion-label>' +
                '</ion-item>' +
                '<ion-item>' +
                '<ion-icon name="time" slot="start"></ion-icon>' +
                '<ion-label>' +
                '14:00–23:00' +
                '</ion-label>' +
                '</ion-item>' +
                '<ion-button color="laranja" expand="block" fill="outline">Abrir</ion-button>' +
                '</div>' +
                '</div>';
            var infowdBarExemplo1 = new google.maps.InfoWindow({
                content: pop_up1,
                maxWidth: 500
            });
            //Marcadores   
            var marcadorBarExemplo1 = new google.maps.Marker({
                position: new google.maps.LatLng(-22.494989, -48.562270),
                map: _this.map,
                animation: google.maps.Animation.DROP
            });
            marcadorBarExemplo1.addListener('click', function () {
                infowdBarExemplo1.open(this.map, marcadorBarExemplo1);
            });
            //FimBarExemplo1//
            //BarExemplo2//
            //pop-up
            var pop_up2 = '<div>' +
                '<h4>Bar Exemplo 2</h4>' +
                '<div>' +
                '<ion-item>' +
                '<ion-icon name="pin" slot="start"></ion-icon>' +
                '<ion-label>' +
                'R. Salvador de Toledo, Nº. 1259 - Centro' +
                '</ion-label>' +
                '</ion-item>' +
                '<ion-item>' +
                '<ion-icon name="call" slot="start"></ion-icon>' +
                '<ion-label>' +
                '(14) 3641-0000' +
                '</ion-label>' +
                '</ion-item>' +
                '<ion-item>' +
                '<ion-icon name="time" slot="start"></ion-icon>' +
                '<ion-label>' +
                '18:00–23:00' +
                '</ion-label>' +
                '</ion-item>' +
                '<ion-button color="laranja" expand="block" routerLink="/list" fill="outline">Abrir</ion-button>' +
                '</div>' +
                '</div>';
            var infowdBarExemplo2 = new google.maps.InfoWindow({
                content: pop_up2,
                maxWidth: 500
            });
            //Marcador
            var marcadorBarExemplo2 = new google.maps.Marker({
                position: new google.maps.LatLng(-22.495279, -48.563343),
                map: _this.map,
                animation: google.maps.Animation.DROP
            });
            marcadorBarExemplo2.addListener('click', function () {
                infowdBarExemplo2.open(this.map, marcadorBarExemplo2);
            });
            //fim Exemplo 2//
            //Fechar os pop-up
            google.maps.event.addListener(_this.map, 'click', function () {
                infowdBarExemplo1.close();
                infowdBarExemplo2.close();
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    HomePage.prototype.ngAfterContentInit = function () { };
    HomePage.prototype.ionViewWillEnter = function () { this.menuCtrl.enable(true); };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Geolocation, MenuController, NavController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map