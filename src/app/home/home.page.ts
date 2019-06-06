import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

import { HTTP } from '@ionic-native/http/ngx';
import { EasymoveapiService } from '../easymoveapi.service';
import { RetornoBusca } from '../retorno-busca';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  map: GoogleMap;
  loading: any;

  public rotas: any[];
  public loadedRotas: any[];

  estado = 1;
  requisicao = {};
  solicitacoes: RetornoBusca[] = []

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private easyMoveApi: EasymoveapiService) {
    //uberService.estimate();
  }

  initializeItems() {
    this.rotas = [
      {
        "titulo": "Unisociesc Marques de Olinda",
        "endereco": "R. Gothard Kaesemodel, 833 - Anita Garibaldi, Joinville - SC, 89203-400",
        "latitude": -26.31915355,
        "longitude": -48.85512424
      },
      {
        "titulo": "Shopping Mueller",
        "endereco": "R. Sen. Felipe Schmidt, 235 - Centro, Joinville - SC, 89201-440",
        "latitude": -26.3039007,
        "longitude": -48.84909284

      },
      {
        "titulo": "Parque Opa",
        "endereco": "R. Max Colin, 1589 - América, Joinville - SC, 89204-635",
        "latitude": -26.29462925,
        "longitude": -48.85431007
      },
      {
        "titulo": "Garten Shopping",
        "endereco": "Av. Rolf Wiest, 333 - Bom Retiro, Joinville - SC, 89223-005",
        "latitude": -26.2538027,
        "longitude": -48.85328455
      },
      {
        "titulo": "Unisociesc Boa Vista",
        "endereco": "R. Albano Schmidt, 3333 - Boa Vista, Joinville - SC, 89206-001",
        "latitude": -26.28850855,
        "longitude": -48.81335555
      },
      {
        "titulo": "Auto Posto BR Bucarein",
        "endereco": "R. Anita Garibaldi, 1099 - Anita Garibaldi, Joinville - SC, 89203-300",
        "latitude": -26.32277734,
        "longitude": -48.85371334
      },
      {
        "titulo": "Cafe Show",
        "endereco": "Av. Cel. Procópio Gomes, 888 - Bucarein, Joinville - SC, 89202-300",
        "latitude": -26.3139342,
        "longitude": -48.8412308
      },
      {
        "titulo": "Hospital Dona Helena",
        "endereco": "R. Blumenau, 123 - Centro, Joinville - SC, 89204-250",
        "latitude": -26.29904075,
        "longitude": -26.29904075
      },
      {
        "titulo": "Hospital Municipal São José",
        "endereco": "R. Dr. Plácido Gomes, 488 - Anita Garibaldi, Joinville - SC, 89202-000",
        "latitude": -26.3106811,
        "longitude": -48.8502335
      },
      {
        "titulo": "Havan Joinville",
        "endereco": "Av. Cel. Procópio Gomes, 249 - Bucarein, Joinville - SC, 89202-300",
        "latitude": -26.30852816,
        "longitude": -48.84043582
      }
    ]
  }

  selecionarRota(rota) {
    this.estado = 2;
    let categoria = 2;

    this.map.getMyLocation().then((location: MyLocation) => {
      this.estado = 3;
      this.requisicao = {
        enderecoDestino: rota.endereco,
        enderecoOrigem: location.latLng.lat + '/' + location.latLng.lng,
        categoria: categoria
      }

      this.solicitacoes = [];
      
      this.easyMoveApi.buscar4Move(location.latLng.lat, rota.latitude, location.latLng.lng, rota.longitude, categoria).then(res => {
        this.solicitacoes.push(res);
      });
      this.easyMoveApi.buscar99Pop(location.latLng.lat, rota.latitude, location.latLng.lng, rota.longitude, categoria).then(res => {
        this.solicitacoes.push(res);
      });
      this.easyMoveApi.buscarUber(location.latLng.lat, rota.latitude, location.latLng.lng, rota.longitude, categoria).then(res => {
        this.solicitacoes.push(res);
      });
    }).catch(err => {
      alert(err);
    });
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " segundos") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  filterList(evt) {

    // this.GoogleAutocomplete = new AutocompleteService();

    this.initializeItems();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      this.rotas = [];
      return;
    }

    this.rotas = this.rotas.filter(currentGoal => {
      if (searchTerm) {
        if (currentGoal.titulo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentGoal.endereco.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

  }

  async onButtonClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null, 2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps plugin!',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
      .catch(err => {
        this.loading.dismiss();
        this.showToast(err.error_message);
      });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
