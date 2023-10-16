import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppSettings, Settings } from '../../../app.settings'; 
import { MaMenuService } from './ma.menu.service'; 

@Component({
  selector: 'app-ma-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  parentMenu:Array<any>;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public menuService:MaMenuService) { 
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
