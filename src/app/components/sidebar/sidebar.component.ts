import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Exchange', icon: 'ni-money-coins text-green', class: '' },
  { path: '/maps', title: 'Prediction', icon: 'ni-sound-wave text-orange', class: '' },
  { path: '/tables', title: 'History', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/user-profile', title: 'Settings', icon: 'ni-settings-gear-65 text-yellow', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
