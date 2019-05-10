import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomePage } from './home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  rootPage: any;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Suas Viagens',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Pagamento',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Ajuda',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Configurações',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Sair',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.rootPage = HomePage;

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
