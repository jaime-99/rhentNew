import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSettings, Settings } from 'src/app/app.settings';
import { RhMenuService } from './rhmenu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ RhMenuService ]
})
export class RhMenuComponent implements OnInit {
  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  parentMenu:Array<any>;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public menuService:RhMenuService) { 
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
