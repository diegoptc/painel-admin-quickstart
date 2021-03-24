import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MenuItem } from 'primeng/api';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public hideMenu;
  public menuUser: MenuItem[] = [];
  public menu: any[] = [];

  constructor(
    private deviceDetectorService: DeviceDetectorService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.hideMenu = this.deviceDetectorService.isMobile();
  }

  ngOnInit(): void {
    this.menuUser = this.factoryMenuUser();
    this.menu = this.factoryMenu();
  }

  factoryMenuUser(): MenuItem[] {
    const menuUser: MenuItem[] = [];

    const logout: MenuItem = {
      label: 'Sair',
      icon: 'pi pi-power-off',
      command: () => {
        this.sessionService.clearSession();
        this.router.navigate(['/auth/login']);
      }
    };
    menuUser.push(logout);

    return menuUser;
  }

  factoryMenu(): any[] {
    const menu: any[] = [];

    menu.push(
      {
        label: 'Geral',
        items: [
          {
            label: 'Home',
            routerLink: '/dashboard/home'
          }
        ]
      },
      {
        label: 'Cadastro',
        items : [
          {
            label: 'Teste',
            routerLink: '/dashboard/teste'
          }
        ]
      }
    );

    return menu;
  }
}
