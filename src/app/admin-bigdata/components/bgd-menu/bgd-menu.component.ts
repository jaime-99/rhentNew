import { Component, Input, OnInit } from '@angular/core';
import { AppSettings, Settings } from '../../../app.settings'; 

import { BgdMenuService } from './bgd-menu.service';

@Component({
  selector: 'app-bgd-menu',
  templateUrl: './bgd-menu.component.html',
  styleUrls: ['./bgd-menu.component.scss']
})
export class BgdMenuComponent implements OnInit {

  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  parentMenu:Array<any>;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public menuService:BgdMenuService) { 
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {     
    this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);  
  }

  onClick(menuId){
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuItems, menuId);    
  }

}
